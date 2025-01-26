"use client";
import { useState, useEffect } from "react";
import Window from "@/public/window.png";
import Image from "next/image";
import Navigation from "@/components/navbar";
import Deck from "../../components/deck/deck";
import flowers from "@/data/flowers";
import { RiCheckboxBlankFill } from "react-icons/ri";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completed, setCompleted] = useState("");
  const [currPlant, setCurrPlant] = useState("");
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    // Fetch the session and tasks on component mount
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data?.user) {
        setSession(data);
        setTasks(data.user.tasks || []); // Set tasks from session data
        setCompleted(data.user.completed);
        setCurrPlant(data.user.currPlant);
        setCollection(data.user.collection);
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
      }

      // Clear the input field after a successful request
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const removeTask = async (taskToRemove) => {
    // Immediately remove the task locally and increment the completed count
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToRemove));
    setSession((prevSession) => ({
      ...prevSession,
      user: {
        ...prevSession.user,
        completed: prevSession.user.completed + 1, // Increment the completed count
      },
    }));

    // Perform the backend request
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskToRemove }),
    });
  };

  if (!session) {
    return (
      <div className="font-itim">
        <h1>You need to be logged in to view the dashboard</h1>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#CAEAFF] min-h-screen font-itim">
      <Navigation />
      <div className="rounded-2xl bg-[#3F637B] w-[40%]">
        <h1 className="tracking-wide font-itim font-bold p-2 justify-self-center items-center text-[#FFD864] my-5 flex lg:text-4xl sm:text-2xl">
          Welcome to your dashboard, {session.user.name}!
        </h1>
      </div>

      <Image
        src={Window}
        alt="Window"
        width={450}
        height={550}
        className="flex items-center mx-auto"
      />
      <div className="mt-8 justify-self-center text-white lg:text-4xl md:text-4xl sm:text-md rounded-3xl bg-[#52842A] p-4 w-1/4">
        <p className="pt-1 tracking-widest font-modak lg:text-5xl sm:text-2xl justify-self-center items-center">
          TASKS
        </p>
      </div>
      <div className="font-itim font-bold flex space-x-4 mt-4 justify-self-center items-center">
        <input
          className="justify-self-center rounded-3xl flex p-3"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{ marginRight: "10px" }}
        />
        <button
          className="hover:bg-[#85cc98] hover:text-[#224a34] tracking-wide text-white bg-green-800 py-2 px-4 rounded-full"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="font-itim mt-6 justify-center items-center flex-col flex">
        {tasks.length > 0 ? (
          <ul className="items-center w-full max-w-md mx-auto space-y-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="space-x-4 max-w-lg bg-[#E9FFDE] p-2 rounded-md duration-200 flex items-center"
              >
                <button
                  onClick={() => {
                    removeTask(task);
                  }} // Remove the task when clicked
                  className="mr-5 bg-[#52842A] text-white w-5 h-5 flex items-center justify-center rounded-sm hover:bg-[#284014] transition-colors"
                >
                  <RiCheckboxBlankFill />
                </button>
                {task}
              </li>
            ))}
            {session.user.collection.map((item, index) => (
              <li key={index} className="flex items-center">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-2 justify-self-center">No tasks available.</p>
        )}
        <br />
        <div className="font-itim text-3xl">
          {session.user.completed} - Completed
        </div>
        <Image
          className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={
            flowers[session.user.currPlant % 3].images[
              session.user.completed % 4
            ]
          }
          alt="yippee!"
        />
      </div>
      <div id="deck">
        <Deck />
      </div>
    </div>
  );
};

export default Dashboard;
