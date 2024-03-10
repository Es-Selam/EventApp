import { useState, useEffect } from 'react';

export const useDynamicHeight = () => {
    const [dynamicHeight, setDynamicHeight] = useState('100vh');

    useEffect(() => {
        const updateDynamicHeight = () => {
            const vh = window.innerHeight * 0.01;
            setDynamicHeight(`${vh * 100}px`);
        };

        window.addEventListener('resize', updateDynamicHeight);
        updateDynamicHeight();

        return () => window.removeEventListener('resize', updateDynamicHeight);
    }, []);

    return dynamicHeight;
};
