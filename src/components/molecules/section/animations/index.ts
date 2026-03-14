import { fadeAnimations } from "./fade";
import { slideAnimations } from "./slide";
import { zoomAnimations } from "./zoom";

export type { SectionAnimationPreset, SectionMotionState } from "./types";

export const sectionAnimations = {
    ...fadeAnimations,
    ...slideAnimations,
    ...zoomAnimations,
};
