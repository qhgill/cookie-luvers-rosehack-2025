import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    tasks: string[]; // Add the tasks property to the User type
  }

  interface Session {
    user: User & DefaultSession["user"]; // Extend Session's user with custom properties
  }
}
