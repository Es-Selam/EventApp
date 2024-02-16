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
                Wahrlich, wir gehören Allah und zu Ihm kehren wir zurück. Liebe Brüder und Schwestern, wir trauern um
                den Verlust von Muhamed Memeti, der heute von uns gegangen ist. Die Beerdigung findet statt in
                Niederuzwil. Möge Allah ihm Frieden schenken und seine Familie in Geduld und Stärke umhüllen.
            </div>

            <IconInfo
                icon={faCalendarDays}
                text="12.02.2024"
                additionalClasses="border-red-800"
            />

            <IconInfo
                icon={faLocationDot}
                text="Niederuzwil"
                additionalClasses="border-green-400"
            />

            <IconInfo
                icon={faClock}
                text="13:00 Uhr"
                additionalClasses="border-red-400"
            />

            {/*<Carousel />*/}
        </main>
    );
}
