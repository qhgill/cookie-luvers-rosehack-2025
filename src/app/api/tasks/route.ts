import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
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

    // Debugging: log the session and task
    console.log("Session user name:", session.user.name);
    console.log("Task to add:", task);

    // Add the task to the user's tasks array
    const updatedUser = await accountsCollection.findOneAndUpdate(
      { name: session.user.name },
      { $push: { tasks: task } },
      { returnDocument: "after" }, // Return the updated document
    );

    if (!updatedUser.value) {
      // Debugging: log the result of the findOneAndUpdate query
      console.log("User not found or update failed:", updatedUser);
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Debugging: log the updated tasks
    console.log("Updated tasks:", updatedUser.value.tasks);

    return new Response(JSON.stringify(updatedUser.value.tasks), {
      status: 200,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
