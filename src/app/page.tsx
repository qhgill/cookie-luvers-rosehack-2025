"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React from "react";

type Name = [name: string, (name: string) => void];

type Email = [email: string, (email: string) => void];
const Home = () => {
  const [name, setName]: Name = useState("");
  const [email, setEmail]: Email = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api({
      method: "POST",
      url: "/api/user",
      body: { name, email },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          toast(`Submitted successfully!`);
        } else {
          throw new Error("Internal Server Error");
        }
        setName("");
        setEmail("");
      })
      .catch(() => toast(`Internal Server Error`));
  };

  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center">
      <p className="text-xl mb-4">Add Data to MongoDB</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-md"
      >
        <div className="mb-4 p-3">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 p-3">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
