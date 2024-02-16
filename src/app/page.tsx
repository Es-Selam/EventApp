'use client';// Import React and necessary hooks
import React, { useEffect, useState } from 'react';
// Import styles and icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import IconInfo from "@/app/IconInfo"; // Adjust the import path as necessary

// Tell Font Awesome to skip adding the CSS automatically
config.autoAddCss = false;

export default function Home() {
    // Initialize the events state with an empty array of Event type
    const [events, setEvents] = useState<Event[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    // Function to fetch events
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8000/events'); // Replace YOUR_API_ENDPOINT with your actual endpoint
            const data: Event[] = await response.json();
            setEvents(data);
            setCurrentEventIndex(0); // Reset to the first event after fetching new events
        } catch (error) {
            console.error('Failed to fetch events:', error);
            // Define mock data in case of an error
            const mockData: Event[] = [{
                title: 'Sample Event',
                description: 'This is a sample event description.',
                date: '2022-12-31',
                location: 'Sample Location',
                time: '12:00',
            }];
            setEvents(mockData);
        }
    };

    useEffect(() => {
        fetchEvents();
        const fetchInterval = setInterval(fetchEvents, 5 * 60 * 1000); // Fetch events every 5 minutes

        return () => clearInterval(fetchInterval); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const displayInterval = setInterval(() => {
                setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length); // Cycle through events
            }, 30 * 1000);

            return () => clearInterval(displayInterval); // Cleanup on component unmount
        }
    }, [events]);

    // Check if there are any events before trying to access the current event
    const currentEvent = events.length > 0 ? events[currentEventIndex] : null;

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
        </main>
    );
}

interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
}