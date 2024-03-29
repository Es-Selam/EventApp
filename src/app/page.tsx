'use client';
import React from 'react';
import IconInfo from "@/app/ui/IconInfo";
import { faCalendarDays, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import fontawesome styles
import {useDynamicFontSize} from "@/app/lib/dynamicFontSize";
import {useEventIterator} from "@/app/lib/eventIterator";
import {EventModel, useEvents} from "@/app/lib/useEvents";
import {useDynamicHeight} from "@/app/lib/useDynamicHeight";
import {formatDate} from "@/app/lib/formatDate";
import ScrollingText from "@/app/ui/scrollingText";

// Prevent fontawesome from adding its styles since we're doing it manually
config.autoAddCss = false;

// Add icons to the library
library.add(faCalendarDays, faClock, faLocationDot);

const Page = () => {
    const { events, error } = useEvents('https://events.es-selam.ch');
    const dynamicHeight =  useDynamicHeight();
    const { currentEventIndex, progress } = useEventIterator(events);
    const currentEvent: EventModel = events[currentEventIndex] || null;
    const dynamicFontSize = useDynamicFontSize(currentEvent?.title || '');

    if (error) {
        return <div>Failed to load events: {error}</div>;
    }

    return (
        <main style={{ height: dynamicHeight }} className="grid grid-cols-3 grid-rows-6 dark:text-[#ececec]">
            {currentEvent ? (
                <>
                    {/* Event Display */}
                    <div className="grid grid-cols-6 col-span-full border-b-8 border-black dark:border-white">
                        <div
                            className="flex items-center justify-center col-span-1 text-center
                            sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                            style={{fontFamily: "'Permanent Marker', cursive"}}>
                            {currentEvent.calendarName}
                        </div>
                        <div style={{fontSize: dynamicFontSize}} className="flex items-center justify-center col-span-4 text-center
                     text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide ">
                            {currentEvent.title}
                        </div>
                        <div
                            className="flex items-center justify-center col-span-1 overflow-hidden">
                            <img src="/es_selam_logo.svg" alt="Es-Selam Logo"
                                 className="h-[70%] object-contain" />
                        </div>
                    </div>

                    {/* Event Description */}
                    <ScrollingText className="px-20 justify-center col-span-full row-span-4
                    text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium"
                                   currentIndex={currentEventIndex}
                                   text={currentEvent.description}/>

                    {/* Event Details */}
                    <IconInfo icon={faCalendarDays} text={formatDate(currentEvent.date)}/>
                    <IconInfo icon={faLocationDot} text={currentEvent.location}/>
                    <IconInfo icon={faClock} text={currentEvent.time}/>
                    {/* Progress Bar */}
                    <div className="col-span-full w-full h-2 bg-gray-200">
                        <div className="h-2 bg-blue-500" style={{width: `${progress}%`}}></div>
                    </div>
                </>

            ) : (
                <div>Loading events...</div>
            )}


        </main>
    );
};

export default Page;
