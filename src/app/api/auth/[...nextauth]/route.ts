import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";

export const handler = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        // Connect to DB
        const client = await connectDB();
        const db = client.db();
        const accountsCollection = db.collection("accounts");

        // Find the user by username
        const existingUser = await accountsCollection.findOne({
          name: credentials.name,
        });
        console.log(existingUser);

        if (!existingUser) {
          throw new Error("Invalid credentials"); // Generic error for security
        }

        // Compare the passwords directly (plain-text comparison)
        if (existingUser.password !== credentials.password) {
          throw new Error("Invalid credentials"); // Generic error for security
        }

        // Return user object if login is successful
        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          tasks: existingUser.tasks || [],
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.tasks = user.tasks || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.tasks = token.tasks || [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Customize sign-in page if needed
    error: "/auth/error", // Error redirect page
  },
});

export { handler as GET, handler as POST };
