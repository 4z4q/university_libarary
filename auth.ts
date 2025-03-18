import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          console.log("Credentials received:", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("Email or password missing");
            return null;
          }

          const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.email.toString()))
            .limit(1);

          if (user.length === 0) {
            console.log("User not found");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password.toString(),
            user[0].password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("User authenticated:", user[0]);
          return {
            id: user[0].id,
            name: user[0].fullName,
            email: user[0].email,
          } as User;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
