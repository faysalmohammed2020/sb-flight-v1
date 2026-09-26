import type { NextAuthConfig } from "next-auth";

const authConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/api/customers")
      ) {
        return !!auth?.user;
      }

      return true;
    },
  },
} satisfies Omit<NextAuthConfig, "providers">;

export default authConfig;