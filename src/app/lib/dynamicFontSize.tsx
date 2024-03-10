import {useEffect, useState} from "react";

export const useDynamicFontSize = (title:string) => {
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