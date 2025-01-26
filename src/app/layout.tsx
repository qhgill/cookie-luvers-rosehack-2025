/* eslint-disable new-cap */
import "./globals.css";
import { Inter, Modak, Itim } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const modak = Modak({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--modak-font",
});

const itim = Itim({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--itim-font",
});

export const metadata = {
  title: "Rose Deck",
  description:
    "Create your own account to collect different rarities of roses based on the amount of tasks completed!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}${modak.variable}${itim.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
