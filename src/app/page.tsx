"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";

type Name = [name: string, (name: string) => void];

type Password = [password: string, (password: string) => void];
const Home = () => {
  const router = useRouter();
  const [name, setName]: Name = useState("");
  const [password, setPassword]: Password = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api({
        method: "POST",
        url: "/api/user",
        body: { name, password },
      });

      if (response.status === 200) {
        toast("Submitted successfully!");
        setName("");
        setPassword("");
        router.push("/login");
      } else if (response.status === 400) {
        toast("You're stupid");
        setName("");
        setPassword("");
      } else if (response.status === 350) {
        toast("You wrote nothing loser");
        setName("");
        setPassword("");
      }
    } catch (error) {
      toast("Internal Server Error");
    }
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
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            password:
          </label>
          <input
            type="password"
            id="password"
            className="px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <div className="text-center mt-10">
        <p className="text-lg text-bold text-black m-5">
          have an account already?
        </p>
        <Link
          className="bg-slate-500 text-black font-bold py-2 px-4 rounded-md mb-4"
          href="/login"
        >
          go to login
        </Link>
      </div>
    </div>
  );
};

export default Home;
