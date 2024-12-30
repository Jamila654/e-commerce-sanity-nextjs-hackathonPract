'use client'
import { Truck } from "lucide-react";
import React from "react";

export default function Marquee() {
  return (
    <main className=" bg-purple-700 text-white font-bold text-nowrap w-full max-h-[10%] flex items-center">
            <h1 className="scroll-text">We only ship to the US!</h1>
        </main>
  );
}

