"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="font-serif font-bold w-full h-screen  flex flex-col justify-center items-center bg-[#B4DD93]">
      <Image
        src="/rosedeoctext.png"
        height={500}
        width={500}
        className="mb-6"
        alt="RoseDeck"
      />
      <p className="text-xl mb-8">CREATE ACCOUNT</p>
      <form
        onSubmit={handleSubmit}
        className="h-[40%] flex flex-col items-center w-1/4 mx-auto bg-[#7DC857] shadow-md rounded-md"
      >
        <div className="py-7">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            username:
          </label>
          <input
            type="text"
            id="name"
            placeholder="ex: flower"
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#a84750] text-[#a84750]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-8">
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
            className="px-3 py-2 border rounded-md caret-[#E27A84] bg-[#F5D7D1] placeholder-[#a84750] text-[#a84750]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#F5D7D1] hover:bg-[#E27A84] hover:text-[#F5D7D1] text-[#a84750] font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-center mt-5">
        <p className="text-lg text-bold text-black m-5">
          Have an Account Already?🤔
        </p>
        <Link
          className="bg-[#F5D7D1] hover:bg-[#E27A84] hover:text-[#F5D7D1] text-[#a84750] font-bold py-2 px-4 rounded-md mb-4"
          href="/login"
        >
          🍃Go To Login🍃
        </Link>
      </div>
    </div>
  );
};

export default Home;
