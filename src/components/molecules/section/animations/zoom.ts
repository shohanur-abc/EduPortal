import type { SectionAnimationPreset } from "./types";

export const zoomAnimations = {
    zoomIn: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "animate-in zoom-in-95 fade-in duration-500",
        exit: "animate-out zoom-out-95 fade-out duration-300",
    },
    zoomOut: {
        base: "transition-all ease-out motion-reduce:transition-none",
        enter: "opacity-100 scale-100",
        exit: "animate-out zoom-out-95 fade-out duration-400",
    },
} satisfies Record<string, SectionAnimationPreset>;
