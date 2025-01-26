"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
// import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React from "react";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="font-itim font-bold w-full h-screen flex flex-col justify-center items-center bg-[#bee49e]">
      <Image
        src="/rosedeoctext.png"
        height={500}
        width={500}
        className="mb-6"
        alt="RoseDeck"
      />
      <p className="text-xl mb-7">LOGIN</p>
      <form
        onSubmit={handleSubmit}
        className="h-[40%] flex flex-col items-center w-1/4 mx-auto bg-[#7DC857] shadow-md rounded-md"
      >
        <div className="p-7">
          <label
            htmlFor="name"
            className="block text-[gray-700] font-bold mb-2"
          >
            username:
          </label>
          <input
            type="text"
            id="name"
            placeholder="ex: rose"
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#a84750] text-[#a84750]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-black font-bold mb-2">
            password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="ex: watering123$"
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#a84750] text-[#a84750]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#F5D7D1] hover:bg-[#E27A84] hover:text-[#F5D7D1] text-[#a84750] font-bold py-2 px-4 rounded-md mb-4"
          >
            {loading ? "Logging in..." : "🍃Login🍃"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
