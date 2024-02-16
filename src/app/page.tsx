'use client'
import React from 'react';
import Carousel from "@/app/Carousel";

export default function Home() {
    return (
        <main className="grid grid-cols-3 grid-rows-6 min-h-screen
        max-h-screen border-4 border-amber-400">
            <div className="flex items-center justify-center border-4
             col-span-full border-blue-400 text-center text-3xl
             sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
             font-extrabold tracking-wide">
                Beerdigung Uzwil
            </div>
            <div className="p-20 flex items-center justify-center
            border-4 col-span-full row-span-4 border-green-400 text-center
            sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">
                Wahrlich, wir gehören Allah und zu Ihm kehren wir zurück. Liebe Brüder und Schwestern, wir trauern um den Verlust von Muhamed Memeti, der heute von uns gegangen ist. Die Beerdigung findet statt in Niederuzwil. Möge Allah ihm Frieden schenken und seine Familie in Geduld und Stärke umhüllen.
            </div>
            <div className="flex items-center justify-center border-4 border-red-400 text-center">
                Datum: 12.02.2024
            </div>
            <div className="flex items-center justify-center border-4 border-teal-600 text-center">
                Zeit: 13:00 Uhr
            </div>
            <div className="flex items-center justify-center border-4 border-fuchsia-800 text-center">
                Ort: Niederuzwil
            </div>

            {/*<h1 className="text-4xl font-bold">Welcome to Es-Selam Events!</h1>*/}
            {/*<Carousel />*/}
        </main>
    );
}
