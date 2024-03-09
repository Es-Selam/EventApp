import { useState, useEffect, useRef } from 'react';
import { EventModel } from "@/app/lib/useEvents";

export const useEventIterator = (events: EventModel[], intervalTime = 20000) => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const animate = (time: number) => {
        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }
        const elapsedTime = time - startTimeRef.current;
        const progress = (elapsedTime / intervalTime) * 100;
        setProgress(progress >= 100 ? 100 : progress); // Ensure progress doesn't exceed 100%

        if (progress < 100) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        const updateProgress = () => {
            requestRef.current = requestAnimationFrame(animate);
        };

        const displayInterval = setInterval(() => {
            startTimeRef.current = null; // Reset the start time for the next cycle
            setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
            updateProgress(); // Restart the progress animation
        }, intervalTime);

        updateProgress(); // Start the progress animation

        return () => {
            clearInterval(displayInterval);
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [events.length, intervalTime]);

    return { currentEventIndex, progress };
};
