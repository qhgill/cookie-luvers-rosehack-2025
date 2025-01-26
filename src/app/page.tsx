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
    <div className="font-serif w-full h-screen  flex flex-col justify-center items-center bg-[#B4DD93]">
      <img
        src="rosedeoctext.png"
        alt="RoseDeck"
        className="w-500 h-500 object-contain mb-4"
      />
      <p className="text-xl mb-4">CREATE ACCOUNT</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-[#7DC857] shadow-md rounded-md"
      >
        <div className="mb-4 p-3">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            username:
          </label>
          <input
            type="text"
            id="name"
            placeholder="ex: flower"
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#E27A84] text-[#E27A84]"
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
            placeholder="ex: wilting@69z"
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#E27A84] text-[#E27A84]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#F5D7D1] hover:bg-[#E27A84] hover:text-[#F5D7D1] text-[#E27A84] font-bold py-2 px-4 rounded-md mb-4"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-center mt-10">
        <p className="text-lg text-bold text-black m-5">
          Have an Account Already?🤔
        </p>
        <Link
          className="bg-[#F5D7D1] hover:bg-[#E27A84] hover:text-[#F5D7D1] text-[#E27A84] font-bold py-2 px-4 rounded-md mb-4"
          href="/login"
        >
          🍃Go To Login🍃
        </Link>
      </div>
    </div>
  );
};

export default Home;
