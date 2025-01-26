import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";

export const POST = async (req) => {
  try {
    const session = await getServerSession(handler);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { task } = await req.json();
    if (!task || typeof task !== "string") {
      return NextResponse.json({ error: "Invalid task" }, { status: 400 });
    }

    const client = await connectDB();
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    // Check if the task already exists in the user's tasks array
    const user = await accountsCollection.findOne({ name: session.user.name });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.tasks.includes(task)) {
      return NextResponse.json(
        { error: "Task already exists" },
        { status: 400 },
      );
    }

    // Add the task to the user's tasks array
    const updatedUser = await accountsCollection.findOneAndUpdate(
      { name: session.user.name },
      { $push: { tasks: task } },
      { returnDocument: "after" },
    );

    return NextResponse.json(updatedUser.value.tasks, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (req) => {
  try {
    const session = await getServerSession(handler);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { task } = await req.json();

    if (!task || typeof task !== "string") {
      return new Response(JSON.stringify({ error: "Invalid task" }), {
        status: 400,
      });
    }

    const client = await connectDB();
    const db = client.db();
    const accountsCollection = db.collection("accounts");

    // Remove the task from the user's tasks array and increment completed
    const updatedUser = await accountsCollection.findOneAndUpdate(
      { name: session.user.name },
      {
        $pull: { tasks: task }, // Remove the task
        $inc: { completed: 1 }, // Increment the completed field
      },
      { returnDocument: "after" }, // Return the updated document
    );

    if (!updatedUser.value) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Check if the completed value % 4 === 3
    const isCompletedSpecial = updatedUser.value.completed % 4 === 3;
    console.log(isCompletedSpecial);
    console.log(updatedUser.value.completed);

    if (isCompletedSpecial) {
      // Logic to update the currPlant index (cycling through 0, 1, 2)
      currPlant = (currPlant + 1) % 3; // Increment and wrap around if greater than 2

      // Update the value at the currPlant index in the completed array
      await accountsCollection.findOneAndUpdate(
        { name: session.user.name },
        {
          $set: {
            [`completed.${currPlant}`]: true, // Set the value at the specific index
          },
          $setOnInsert: { currPlant }, // Optionally set currPlant if needed
        },
      );
    }

    return new Response(
      JSON.stringify({
        tasks: updatedUser.value.tasks,
        completed: updatedUser.value.completed,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
