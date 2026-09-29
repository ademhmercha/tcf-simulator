import "server-only";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import { randomBytes } from "node:crypto";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/db";
import { AUTH_RATE_LIMITS, rateLimit } from "@/lib/security";
import { LOGIN_SCHEMA } from "@/server/validation/auth";
import type { Role } from "@/config/enums";

// ---------------------------------------------------------------------------
// Configuration Auth.js (v5).
//
// - Strategy JWT : imposee par le provider Credentials, qui n'est compatible
//   qu'avec des sessions JWT. L'adapter Prisma reste utilise pour persister les
//   comptes OAuth (Google).
// - Mot de passe hashe avec bcrypt (12 tours).
// - Rate limiting en memoire sur la route credentials.
// ---------------------------------------------------------------------------

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      locale: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    locale: string;
  }
}

// `next-auth/jwt` ne fait que re-exporter `@auth/core/jwt` : c'est ce module
// que TypeScript exige pour l'augmentation de l'interface `JWT`.
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    locale?: string;
  }
}

const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  // JWT : le provider Credentials l'exige, et cela evite un acces base a chaque
  // lecture de session. Les informations d'identification restent en base.
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  trustHost: true,
  pages: {
    signIn: "/fr/login",
    newUser: "/fr/register",
    error: "/fr/login",
    verifyRequest: "/fr/forgot-password",
  },
  providers: [
    Credentials({
      name: "E-mail",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(raw) {
        const parsed = LOGIN_SCHEMA.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const limit = rateLimit(`login:${email}`, AUTH_RATE_LIMITS.login);
        if (!limit.ok) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            role: true,
            locale: true,
            passwordHash: true,
            emailVerified: true,
          },
        });

        // Comparaison systematique (y compris quand aucun compte n'existe)
        // afin de ne pas reveler l'existence d'une adresse par le temps de
        // reponse.
        const hash = user?.passwordHash ?? "$2a$12$0000000000000000000000000000000000000000000000000000";
        const valid = await compare(password, hash);

        if (!user || !user.passwordHash || !valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role as Role,
          locale: user.locale,
          emailVerified: user.emailVerified,
        };
      },
    }),
    // Configure uniquement si les identifiants Google sont presents, afin de
    // ne pas faire echouer l'initialisation du module en developpement.
    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
  ],
  callbacks: {
    // Les identifiants sont copies dans le JWT a la connexion, puis relus a
    // chaque requete : le cookie suffit, sans requeter la base.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role ?? "USER") as Role;
        token.locale = user.locale ?? "fr";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? session.user.id;
        session.user.role = (token.role ?? "USER") as Role;
        session.user.locale = token.locale ?? "fr";
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Un compte connecte via Google qui n'a pas de role defini est promu
      // "USER" par defaut ; la promotion "ADMIN" se fait uniquement en base.
      void user;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

/** Utilitaire interne : regenere un secret (utile pour le README). */
export function generateAuthSecret(): string {
  return randomBytes(32).toString("base64url");
}
