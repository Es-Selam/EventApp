import React from 'react';
import { marked } from 'marked';

interface ScrollingTextProps {
    text: string;
    className?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, className }) => {
    return (
        <div className={`scrolling-text-container ${className}`}>
            <div className="scrolling-text" dangerouslySetInnerHTML={{ __html: marked(text) }}></div>
        </div>
    );
};

export default ScrollingText;
