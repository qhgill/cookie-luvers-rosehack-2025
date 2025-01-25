import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";

interface User {
  name: string;
  email: string;
}

export const POST = async (req) => {
  const client = await connectDB();

  const { name, email }: User = await req.json();
  try {
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    await accountsCollection.insertOne({
      name,
      email,
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error: ${err.message}` },
      { status: 500 },
    );
  }
};
