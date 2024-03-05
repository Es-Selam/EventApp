'use client';
import React, { useState, useEffect } from 'react';
import { useEvents } from '../useEvents'; // Assuming this is the path to your custom hook
import { useDynamicHeight } from '../useDynamicHeight'; // Assuming this is the path to your custom hook
import { formatDate } from '../lib/formatDate'; // Assuming this is the path to your utility function
import IconInfo from "@/app/ui/IconInfo";
import { faCalendarDays, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import fontawesome styles
import { marked } from "marked";
import {EventModel} from "@/app/page";

// Prevent fontawesome from adding its styles since we're doing it manually
config.autoAddCss = false;

// Add icons to the library
library.add(faCalendarDays, faClock, faLocationDot);

const Page = () => {
    const { events, error } = useEvents('https://events.es-selam.ch');
    const dynamicHeight = useDynamicHeight();
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalTime = 20000; // 20 seconds
        const updateInterval = 100; // Update progress every 100ms

        const displayInterval = setInterval(() => {
            setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
            setProgress(0); // Reset progress for the next event
        }, intervalTime);

        const progressInterval = setInterval(() => {
            setProgress((oldProgress) => {
                const increment = 100 * updateInterval / intervalTime;
                return oldProgress + increment > 100 ? 100 : oldProgress + increment;
            });
        }, updateInterval);

        return () => {
            clearInterval(displayInterval);
            clearInterval(progressInterval);
        };
    }, [events.length]);

    const currentEvent : EventModel = events[currentEventIndex] || null;

    if (error) {
        return <div>Failed to load events: {error}</div>;
    }

    return (
        <main style={{ height: dynamicHeight }} className="grid grid-cols-3 grid-rows-6 dark:text-[#ececec]">
            {currentEvent ? (
                <>
                    {/* Event Display */}
                    <div className="col-span-full grid grid-cols-6">
                        {/* Calendar Name */}
                        <div className="col-span-1 text-center border-b-8 border-black dark:border-white">
                            {currentEvent.calendarName}
                        </div>

                        {/* Event Title */}
                        <div className="col-span-4 text-center border-b-8 border-black dark:border-white" dangerouslySetInnerHTML={{__html: marked(currentEvent.title)}} />

                        {/* Logo */}
                        <div className="col-span-1 text-center border-b-8 border-black dark:border-white">
                            <img src="/es_selam_logo.svg" alt="Es-Selam Logo" className="h-auto max-w-[60%] xl:max-w-[40%] 2xl:max-w-[30%] md:p-2"/>
                        </div>
                    </div>

                    {/* Event Description */}
                    <div className="col-span-full row-span-4 px-20 my-auto text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium" dangerouslySetInnerHTML={{__html: marked(currentEvent.description)}} />

                    {/* Event Details */}
                    <IconInfo icon={faCalendarDays} text={formatDate(currentEvent.date)} />
                    <IconInfo icon={faLocationDot} text={currentEvent.location} />
                    <IconInfo icon={faClock} text={currentEvent.time} />
                </>
            ) : (
                <div>Loading events...</div>
            )}

            {/* Progress Bar */}
            <div className="col-span-full w-full h-2 bg-gray-200">
                <div className="h-2 bg-blue-500" style={{ width: `${progress}%` }}></div>
            </div>
        </main>
    );
};

export default Page;
