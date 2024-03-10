import {useState, useEffect} from 'react';

export const useEvents = (url: string) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setEvents(data);
            } catch (error : any) {
                console.error('Failed to fetch events:', error);
                setError(error);
            }
        };

        fetchEvents();
        const intervalId = setInterval(fetchEvents, 600000);

        // Clean up the interval when the component unmounts or the URL changes
        return () => clearInterval(intervalId);
    }, [url]);

    return { events, error };
};

export interface EventModel {
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
    calendarName: string; // New field for the calendar name
}