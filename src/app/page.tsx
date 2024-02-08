'use client'
import React from 'react';
import Carousel from "@/app/Carousel";

export default function Home() {
  return (
  <main className="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-4xl font-bold mb-8">Anstehende Events</h1>
    <Carousel />
  </main>
  );
}
