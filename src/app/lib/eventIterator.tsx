import { useState, useEffect, useRef } from 'react';
import { EventModel } from "@/app/lib/useEvents";

export const useEventIterator = (events: EventModel[], intervalTime = 20000) => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number>();
    const startTimeRef = useRef<DOMHighResTimeStamp>();
    const intervalIdRef = useRef<number>();

    const animate = (time: DOMHighResTimeStamp) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsedTime = time - startTimeRef.current;
        const progress = (elapsedTime / intervalTime) * 100;

        setProgress(progress > 100 ? 100 : progress); // Cap the progress at 100%

        if (progress < 100) {
            requestRef.current = requestAnimationFrame(animate) as unknown as number;
        }
    };

    useEffect(() => {
        intervalIdRef.current = window.setInterval(() => {
            setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
            startTimeRef.current = undefined; // Reset the start time
            requestRef.current = requestAnimationFrame(animate) as unknown as number; // Restart the animation
        }, intervalTime) as unknown as number;

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [events.length, intervalTime]);

    // Initialize animation
    useEffect(() => {
        if (events.length > 0 && !requestRef.current) {
            requestRef.current = requestAnimationFrame(animate) as unknown as number;
        }
    }, [events]);

    return { currentEventIndex, progress };
};
