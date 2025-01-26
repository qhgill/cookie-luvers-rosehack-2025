"use client";
import { useState, useEffect } from "react";
import Deck from "../../components/deck/deck";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch the session and tasks on component mount
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data?.user) {
        setSession(data);
        setTasks(data.user.tasks || []); // Set tasks from session data
      }
    };

    fetchSession();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    // Create a new task array and update the UI immediately (optimistic update)
    const newTaskArray = [...tasks, newTask];
    setTasks(newTaskArray); // Immediately reflect the change in UI

    // Make the backend request
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });

      if (!res.ok) {
        console.error("Failed to add task");
        // Optionally, we can handle the error here without reverting the task list
      }

      // Clear the input field after a successful request
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
      // If desired, you can handle the error here, but no need to revert tasks
    }
  };

  if (!session) {
    return (
      <div>
        <h1>You need to be logged in to view the dashboard</h1>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-page items-center">
      <h1>Welcome to your dashboard, {session.user.name}!</h1>
      <h2>Your Tasks:</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{ marginRight: "10px" }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <Deck />
    </div>
  );
};

export default Dashboard;
