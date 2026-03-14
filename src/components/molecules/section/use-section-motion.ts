import * as React from "react";
import type { SectionMotionState } from "./animations";

interface UseSectionMotionOptions {
    animateOnView: boolean;
    once: boolean;
    controlledState?: SectionMotionState;
    initialState: SectionMotionState;
    threshold: number;
    rootMargin: string;
}

export function useSectionMotion({
    animateOnView,
    once,
    controlledState,
    initialState,
    threshold,
    rootMargin,
}: UseSectionMotionOptions) {
    const [node, setNode] = React.useState<HTMLElement | null>(null);
    const [inView, setInView] = React.useState(initialState === "in");
    const [hasAnimatedIn, setHasAnimatedIn] = React.useState(initialState === "in");

    React.useEffect(() => {
        if (!animateOnView || controlledState) return;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    setHasAnimatedIn(true);
                    return;
                }

                if (!once) {
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [animateOnView, controlledState, node, once, rootMargin, threshold]);

    const motionState: SectionMotionState = React.useMemo(() => {
        if (controlledState) return controlledState;
        if (!animateOnView) return initialState;
        if (once && hasAnimatedIn) return "in";
        return inView ? "in" : "out";
    }, [animateOnView, controlledState, hasAnimatedIn, inView, initialState, once]);

    return {
        setMotionNode: setNode,
        motionState,
    };
}
