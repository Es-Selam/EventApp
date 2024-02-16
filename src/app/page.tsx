'use client'
import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faClock, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import IconInfo from "@/app/IconInfo";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export default function Home() {
    return (
        <main className="grid grid-cols-3 grid-rows-6 min-h-screen
        max-h-screen dark:text-[#ececec]">
            <div className="flex items-center justify-center
             col-span-full text-center text-3xl
             sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
             font-extrabold tracking-wide border-b-8 border-black dark:border-white">
                Beerdigung Uzwil
            </div>
            <div className="px-20 flex items-center justify-center
            col-span-full row-span-4 text-center
            sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium border-b-8 border-black dark:border-white">
                Wahrlich, wir gehören Allah und zu Ihm kehren wir zurück. Liebe Brüder und Schwestern, wir trauern um
                den Verlust von Muhamed Memeti, der heute von uns gegangen ist. Die Beerdigung findet statt in
                Niederuzwil. Möge Allah ihm Frieden schenken und seine Familie in Geduld und Stärke umhüllen.
            </div>
            <IconInfo
                icon={faCalendarDays}
                text="12.02.2024"
            />
            <IconInfo
                icon={faLocationDot}
                text="Niederuzwil"
            />
            <IconInfo
                icon={faClock}
                text="13:00 Uhr"
            />
        </main>
    );
}
