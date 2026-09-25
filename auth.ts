import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        if (user.status !== "ACTIVE") {
          return null;
        }

        const validPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName}${
            user.lastName ? ` ${user.lastName}` : ""
          }`,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});