import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import styles from './ScrollingText.module.css';

interface ScrollingTextProps {
    text: string;
    className?: string;
    currentIndex: number;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, className, currentIndex }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const resetAnimation = () => {
        const contentElement = contentRef.current;
        if (contentElement) {
            // Trigger reflow to restart the animation
            contentElement.style.animation = 'none';
            // Accessing offsetWidth triggers reflow
            void contentElement.offsetWidth;
            // Reapply the animation
            contentElement.style.animation = '';
        }
    };

    useEffect(() => {
        const contentElement = contentRef.current;
        if (!contentElement) return;

        // Check if the content overflows its container
        const checkOverflow = () => {
            if (contentElement.parentNode && contentElement.parentNode instanceof HTMLElement) {
                const parentElement = contentElement.parentNode; // Now safely typed as HTMLElement
                const isContentOverflowing =
                    contentElement.scrollHeight > parentElement.clientHeight;
                setIsOverflowing(isContentOverflowing);
            }
        };

        // Perform an initial check
        checkOverflow();

        // Setup a ResizeObserver to handle responsive layout changes
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(contentElement);

        return () => resizeObserver.disconnect();
    }, [text]);

    useEffect(() => {
        resetAnimation();
    }, [currentIndex]);

    return (
        <div className={`${styles.scrollingTextContainer} ${className}`}>
            <div
                ref={contentRef}
                className={`${isOverflowing ? styles.scrollingText : ''}`}
                dangerouslySetInnerHTML={{ __html: marked(text) }}
            ></div>
        </div>
    );
};

export default ScrollingText;
