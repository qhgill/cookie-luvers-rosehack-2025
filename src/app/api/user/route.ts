import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";

interface User {
  name: string;
  password: string;
}

export const POST = async (req) => {
  const client = await connectDB();

  const { name, password }: User = await req.json();

  try {
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    if (name.length == 0 || password.length == 0) {
      return NextResponse.json(
        { message: "You wrote nothing loser" },
        { status: 350 },
      );
    }

    // Step 1: Check if a user with the same name already exists
    const existingUser = await accountsCollection.findOne({ name });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists. Please choose another." },
        { status: 400 },
      );
    }
    const currPlant = 0;
    const completedTasks = 0;
    const tasks = [];
    const collection = [false, false, false];
    // Step 2: Insert the new user if the name is unique
    await accountsCollection.insertOne({
      name,
      password,
      completedTasks,
      tasks,
      currPlant,
      collection,
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: `Internal Server Error: ${err.message}` },
      { status: 500 },
    );
  }
};
