export type SectionMotionState = "in" | "out";

export interface SectionAnimationPreset {
    base?: string;
    enter: string;
    exit: string;
}
