'use client';// Import React and necessary hooks
import React, { useEffect, useState } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import IconInfo from "@/app/IconInfo"; // Ensure this path is correct

config.autoAddCss = false;

interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
}

const Home = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://events.es-selam.ch');
            const data: Event[] = await response.json();
            setEvents(data);
            setCurrentEventIndex(0);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    useEffect(() => {
        // Fetch events immediately when the component mounts
        fetchEvents();

        // Set up a timer to refetch the events every 5 minutes
        const fetchInterval = setInterval(() => {
            fetchEvents();
        }, 600000); // 300000 milliseconds = 5 minutes

        // Clean up the interval when the component unmounts
        return () => clearInterval(fetchInterval);
    }, []); // The empty dependency array means this effect runs once on mount and cleanup on unmount

    useEffect(() => {
        const intervalTime = 30000; // 30 seconds
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
    }, [events]);

    const currentEvent = events[currentEventIndex];

    return (
        <main className="grid grid-cols-3 grid-rows-6 min-h-screen max-h-screen dark:text-[#ececec]">
            {currentEvent ? (
                <>
                    <div className="flex items-center justify-center col-span-full text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide border-b-8 border-black dark:border-white">
                        {currentEvent.title}
                    </div>
                    <div className="px-20 flex items-center justify-center col-span-full row-span-4 text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium border-b-8 border-black dark:border-white">
                        {currentEvent.description}
                    </div>
                    <IconInfo icon={faCalendarDays} text={currentEvent.date} />
                    <IconInfo icon={faLocationDot} text={currentEvent.location} />
                    <IconInfo icon={faClock} text={currentEvent.time} />
                </>
            ) : (
                <div>Loading events...</div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 col-span-full">
                <div className="bg-blue-500 h-2 w-max" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Rest of your component */}
        </main>
    );
};

export default Home;
