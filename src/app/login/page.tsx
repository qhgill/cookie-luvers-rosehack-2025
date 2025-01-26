"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
//import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React from "react";
//import Router from "next/router";
import { useRouter } from "next/navigation";

type Name = [name: string, (name: string) => void];

type Password = [password: string, (password: string) => void];
const Login = () => {
  const router = useRouter();
  const [name, setName] = useState(""); // State to store username
  const [password, setPassword] = useState(""); // State to store password
  const [loading, setLoading] = useState(false); // Loading state for the form

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading state while processing the login

    const response = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      name,
      password,
    });

    setLoading(false); // Set loading to false after API response

    if (response?.error) {
      // Handle error case (e.g., wrong username or password)
      toast("Login failed: " + response.error);
    } else if (response.status === 200) {
      router.push("/dashboard");
    } else {
      // Success case (e.g., successful login)
      toast("Logged in successfully!");
      // Redirect manually (optional)

      router.push("/dashboard"); // Uncomment and replace with your target page
    }
  };

  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center">
      <p className="text-xl mb-4">login!</p>
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
