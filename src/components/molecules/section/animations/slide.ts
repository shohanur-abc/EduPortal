import type { SectionAnimationPreset } from "./types";

export const slideAnimations = {
    slideInUp: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in slide-in-from-bottom-6 duration-500",
        exit: "animate-out slide-out-to-bottom-6 duration-300",
    },
    slideInDown: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in slide-in-from-top-6 duration-500",
        exit: "animate-out slide-out-to-top-6 duration-300",
    },
    slideInLeft: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in slide-in-from-left-8 duration-500",
        exit: "animate-out slide-out-to-left-8 duration-300",
    },
    slideInRight: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in slide-in-from-right-8 duration-500",
        exit: "animate-out slide-out-to-right-8 duration-300",
    },
} satisfies Record<string, SectionAnimationPreset>;
