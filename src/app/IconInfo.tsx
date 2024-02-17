import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconInfoProps {
    icon: IconDefinition;
    text: string;
    additionalClasses?: string;
}

const IconInfo: React.FC<IconInfoProps> = ({ icon, text, additionalClasses }) => {
    return (
        <div className={`flex items-center justify-center text-center
         sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${additionalClasses}`}>
            <FontAwesomeIcon
                icon={icon}
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mr-2"
            />
            {text}
        </div>
    );
};

export default IconInfo;
