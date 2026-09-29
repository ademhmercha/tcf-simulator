import { handlers } from "@/server/auth";

// Route Auth.js : gere /api/auth/* (signin, callback, session, csrf...).
export const { GET, POST } = handlers;
