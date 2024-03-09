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