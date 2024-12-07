import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
      id: string;
      user: {
        id: string;
      } & DefaultSession["user"];
    }
  
    interface JWT {
      id: string;
    }
  }