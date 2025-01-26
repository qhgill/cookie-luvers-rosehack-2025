import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const authOptions = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to DB
        const client = await connectDB();
        const db = client.db();
        const accountsCollection = db.collection("accounts");

        // Find the user by username
        const existingUser = await accountsCollection.findOne({
          username: credentials?.username,
        });

        if (!existingUser) {
          throw new Error("No existing user");
        }

        // Compare the passwords (plain text)
        const passwordMatch = existingUser.password === credentials?.password;
        if (!passwordMatch) {
          throw new Error("Wrong password");
        }

        // Return user object if login is successful
        return {
          id: existingUser.id,
          username: existingUser.username,
          password: existingUser.password,
          // Add other fields as necessary
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

// Export the GET and POST handlers for the API
export const GET = async (req) => {
  // Handle GET requests (for example, to check if the session exists)
  const res = NextResponse;
  return res.json({ message: "wtf man 2" }, { status: 200 });
};

export const POST = async (req) => {
  // Handle POST requests (used for logging in or signing up)
  const res = NextResponse;
  return res.json({ message: "wtf man" }, { status: 200 });
};
