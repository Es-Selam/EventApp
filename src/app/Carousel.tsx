import React, { useState, useEffect } from 'react';

// Updated events structure
const events = [
    {
        id: 1,
        title: 'Generalversammlung',
        description: 'Sie sind herzlich eingeladen zur ordentlichen Generalversammlung für das Jahr 2023/2024. Die Versammlung findet statt am Samstag, 10. Februar 2024, um 20:00 Uhr, nach dem Ishaa-Gebet.',
        location: 'Es-Selam',
        time: '9.2.2024 19:30',
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
        <div className="w-full overflow-hidden rounded-lg shadow-lg text-center
         bg-[#1b1b1c] grid grid-cols-1">
            <div className="p-4 text-8xl font-bold text-amber-800 border-b-gray-950 border-b-2">{events[currentIndex].title}</div>
            <div className="py-60 text-gray-600 text-6xl">{events[currentIndex].description}</div>
            <div className="border-t-gray-950 border-t-2">
                <div className="p-2 text-gray-500">{events[currentIndex].location}, {events[currentIndex].time}</div>
            </div>
        </div>
    );
};

export default Carousel;
