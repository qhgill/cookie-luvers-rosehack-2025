/* eslint-disable new-cap */
import "./globals.css";
import { Inter } from "next/font/google";
import { Modak } from "next/font/google";
import { Itim } from "next/font/google";
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
  title: "MongoDB Next.js Hackpack",
  description: "MongoDB Setup Integration with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}${modak.className}${itim.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
