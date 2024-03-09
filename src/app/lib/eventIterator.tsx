// hooks/useEventIterator.js
import { useState, useEffect } from 'react';
import {EventModel} from "@/app/page";

export const useEventIterator = (events : EventModel[], intervalTime = 20000) => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
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
    }, [events.length, intervalTime]);

    return { currentEventIndex, progress };
};
