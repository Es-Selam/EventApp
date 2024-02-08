import React, { useState, useEffect } from 'react';

// Updated events structure
const events = [
    {
        id: 1,
        title: 'Event 1',
        description: 'Description for Event 1',
        location: 'Location 1',
        time: '12:00 PM',
    },
    {
        id: 2,
        title: 'Event 2',
        description: 'Description for Event 2',
        location: 'Location 2',
        time: '2:00 PM',
    },
    {
        id: 3,
        title: 'Event 3',
        description: 'Description for Event 3',
        location: 'Location 3',
        time: '4:00 PM',
    },
    // Add more events as needed
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % events.length);
        }, 3000); // Change event every 30 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [events.length]);

    return (
        <div className="w-full max-w-xl overflow-hidden rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-2xl font-bold">{events[currentIndex].title}</h3>
            <p className="mt-2 text-gray-600">{events[currentIndex].description}</p>
            <p className="mt-2 text-gray-500">{events[currentIndex].location}</p>
            <p className="mt-1 text-gray-500">{events[currentIndex].time}</p>
        </div>
    );
};

export default Carousel;
