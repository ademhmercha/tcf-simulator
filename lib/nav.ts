/**
 * Vrai si `href` correspond a la route courante. L'accueil ne compte que sur un
 * match exact, sinon `/` serait actif sur chaque page.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Initiales affichables (avatar) tirees du nom, sinon de l'e-mail. */
export function initials(name: string, email: string): string {
  const source = name.trim() || email.split("@")[0] || "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0] ?? "");
  return (letters.join("") || "?").toUpperCase();
}
