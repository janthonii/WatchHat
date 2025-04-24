import { authConfig } from "./auth.config";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/usersSchema";
import connectMongoDB from "./config/mongodb";
import { Types } from "mongoose";

export const authOptions: NextAuthConfig = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();
          
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const username = credentials.username as string;
          const password = credentials.password as string;

          const user = await User.findOne({ username });
          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: (user._id as Types.ObjectId).toString(),
            name: user.username
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt" as const, 
  },
  pages: {
    signIn: "/login",
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

export default NextAuth(authOptions);
