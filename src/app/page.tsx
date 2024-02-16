'use client'
import React from 'react';
import Carousel from "@/app/Carousel";

export default function Home() {
    return (
        <main className="grid grid-cols-3 grid-rows-6 min-h-screen
        max-h-screen border-4 border-amber-400">
            <div className="flex items-center justify-center border-4 col-span-full border-red-400 text-center">1</div>
            <div
                className="flex items-center justify-center border-4 col-span-full row-span-4 border-red-400 text-center">2
            </div>
            <div className="flex items-center justify-center border-4 border-red-400 text-center">3</div>
            <div className="flex items-center justify-center border-4 border-red-400 text-center">4</div>
            <div className="flex items-center justify-center border-4 border-red-400 text-center">5</div>

            {/*<h1 className="text-4xl font-bold">Welcome to Es-Selam Events!</h1>*/}
            {/*<Carousel />*/}
        </main>
    );
}
