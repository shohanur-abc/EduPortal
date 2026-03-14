import type * as React from "react";

// ============= TYPES =============

export interface CarouselClassNames {
    root?: string;
    content?: string;
    item?: string;
    previous?: string;
    next?: string;
    dots?: string;
    dot?: string;
    dotActive?: string;
    counter?: string;
}

export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselSlideDef {
    /** Unique key */
    key?: string;
    /** Slide content */
    content: React.ReactNode;
    /** Additional className */
    className?: string;
}

export interface CarouselProps {
    /** Slide definitions */
    slides: CarouselSlideDef[];
    /** Carousel orientation */
    orientation?: CarouselOrientation;
    /** Show navigation arrows */
    showArrows?: boolean;
    /** Show dot indicators */
    showDots?: boolean;
    /** Show slide counter (e.g., "1 / 5") */
    showCounter?: boolean;
    /** Auto-play interval in ms */
    autoPlay?: number;
    /** Loop slides */
    loop?: boolean;
    /** Number of slides to show per view */
    slidesPerView?: number;
    /** Custom basis class for each slide */
    slideBasis?: string;
    /** Drag-free scrolling */
    dragFree?: boolean;
    /** Align slides */
    align?: "start" | "center" | "end";
    /** Arrow button variant */
    arrowVariant?: "outline" | "ghost" | "default" | "secondary";
    /** Arrow button size */
    arrowSize?: "icon-sm" | "icon" | "icon-lg";
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: CarouselClassNames;
    /** Callback with the carousel API */
    setApi?: (api: unknown) => void;
}
