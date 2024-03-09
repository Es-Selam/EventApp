import React from 'react';
import { marked } from 'marked';
import styles from './ScrollingText.module.css';

interface ScrollingTextProps {
    text: string;
    className?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, className }) => {
    return (
        <div className={`${styles.scrollingTextContainer} ${className}`}>
            <div className={styles.scrollingText} dangerouslySetInnerHTML={{__html: marked(text)}}></div>
        </div>
    );
};

export default ScrollingText;