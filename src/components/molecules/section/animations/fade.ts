import type { SectionAnimationPreset } from "./types";

export const fadeAnimations = {
    none: {
        base: "",
        enter: "opacity-100",
        exit: "opacity-100",
    },
    fadeIn: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in fade-in duration-500",
        exit: "animate-out fade-out duration-300",
    },
    fadeOut: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "opacity-100",
        exit: "animate-out fade-out duration-400",
    },
    fadeInUp: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in fade-in slide-in-from-bottom-4 duration-500",
        exit: "animate-out fade-out slide-out-to-bottom-4 duration-300",
    },
    fadeInDown: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in fade-in slide-in-from-top-4 duration-500",
        exit: "animate-out fade-out slide-out-to-top-4 duration-300",
    },
    fadeInLeft: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in fade-in slide-in-from-left-6 duration-500",
        exit: "animate-out fade-out slide-out-to-left-6 duration-300",
    },
    fadeInRight: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in fade-in slide-in-from-right-6 duration-500",
        exit: "animate-out fade-out slide-out-to-right-6 duration-300",
    },
} satisfies Record<string, SectionAnimationPreset>;
