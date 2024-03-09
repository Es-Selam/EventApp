'use client';// Import React and necessary hooks
import React, { useEffect, useState } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import IconInfo from "@/app/ui/IconInfo";
import {marked} from "marked";
import {EventModel} from "@/app/useEvents"; // Ensure this path is correct

config.autoAddCss = false;

const Home = () => {
    const [events, setEvents] = useState<EventModel[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [dynamicHeight, setDynamicHeight] = useState('100vh');

    function formatDate(isoDateString:string) {
        const date = new Date(isoDateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://events.es-selam.ch');
            const data: EventModel[] = await response.json();
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
        const intervalTime = 20000; // 30 seconds
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

    useEffect(() => {
        // Function to update the viewport height dynamically
        const updateDynamicHeight = () => {
            const vh = window.innerHeight * 0.01;
            setDynamicHeight(`${vh * 100}px`); // Convert to pixels for inline style
        };

        // Add event listener to adjust height on window resize
        window.addEventListener('resize', updateDynamicHeight);
        // Set initial height on component mount
        updateDynamicHeight();

        // Cleanup to remove event listener on component unmount
        return () => window.removeEventListener('resize', updateDynamicHeight);
    }, []);

    const useDynamicFontSize = (title:string) => {
        const [dynamicFontSize, setDynamicFontSize] = useState('1rem');

        useEffect(() => {
            const updateFontSize = () => {
                // Constants to define your scaling
                const maxWidthForBaseSize = 500; // max window width to apply the base font size
                const baseSize = 80; // base font size for the smallest window width
                const scalingFactor = 0.7; // adjust this factor to control scaling

                // Calculate the font size based on the window width and title length
                let size = Math.min(window.innerWidth / maxWidthForBaseSize, 1) * (baseSize - title.length) * scalingFactor;

                // Set a minimum font size
                size = Math.max(size, 16);

                setDynamicFontSize(`${size}px`);
            };

            // Initial update
            updateFontSize();

            // Add event listener to update font size when the window is resized
            window.addEventListener('resize', updateFontSize);

            // Cleanup event listener
            return () => window.removeEventListener('resize', updateFontSize);
        }, [title]);

        return dynamicFontSize;
    };

    const currentEvent = events[currentEventIndex];
    const titleFontSize = useDynamicFontSize(currentEvent?.title || '');
    return (
        <main style={{ height: dynamicHeight }} className={`grid grid-cols-3 grid-rows-6 dark:text-[#ececec]`}>
            {currentEvent ? (
                <>
                    <div className="grid grid-cols-6 col-span-full">
                        <div
                            className="flex items-center justify-center col-span-1 text-center border-b-8 border-black dark:border-white
                            sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                            {currentEvent.calendarName}
                        </div>
                        <div style={{fontSize: titleFontSize}} className="flex items-center justify-center col-span-4 text-center
                     text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide border-b-8 border-black dark:border-white">
                            {currentEvent.title}
                        </div>
                        <div
                            className="flex items-center justify-center col-span-1 text-center border-b-8 border-black dark:border-white">
                            <img src="/es_selam_logo.svg" alt="Es-Selam Logo" className="max-w-[60%] xl:max-w-[40%] 2xl:max-w-[30%] md:p-2 h-auto"/>
                        </div>
                    </div>
                    <div className="px-20 my-auto col-span-full row-span-4
                    text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium"
                         dangerouslySetInnerHTML={{__html: marked(currentEvent.description)}}>
                    </div>
                    <IconInfo icon={faCalendarDays} text={formatDate(currentEvent.date)}/>
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
        </main>
    );
};

export default Home;
