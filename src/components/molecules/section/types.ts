import type { ReactNode } from "react";
import type { SectionAnimationPreset, SectionMotionState } from "./animations";

export type SectionAlign = "left" | "center" | "right";
export type SectionWidth = "sm" | "md" | "lg" | "xl" | "full";
export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";
export type SectionSurface = "none" | "muted" | "card" | "bordered";
export type SectionRadius = "none" | "md" | "lg" | "xl";
export type SectionShadow = "none" | "sm" | "md" | "lg";
export type SectionContentLayout = "stack" | "grid-2" | "grid-3" | "grid-4";

export type SectionAnimationName =
    | "none"
    | "fadeIn"
    | "fadeOut"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "slideInUp"
    | "slideInDown"
    | "slideInLeft"
    | "slideInRight"
    | "zoomIn"
    | "zoomOut";

export interface SectionClassNames {
    root?: string;
    motion?: string;
    inner?: string;
    decorative?: string;
    header?: string;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    actions?: string;
    divider?: string;
    content?: string;
}

export interface SectionProps {
    id?: string;
    role?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    children?: ReactNode;
    decorative?: ReactNode;
    eyebrow?: ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    actions?: ReactNode;
    divider?: boolean;
    align?: SectionAlign;
    width?: SectionWidth;
    padding?: SectionPadding;
    surface?: SectionSurface;
    radius?: SectionRadius;
    shadow?: SectionShadow;
    containerized?: boolean;
    contentLayout?: SectionContentLayout | "auto";
    contentMinItemWidth?: string;
    animation?: SectionAnimationName | SectionAnimationPreset;
    animationState?: SectionMotionState;
    animateOnView?: boolean;
    animationOnce?: boolean;
    animationDelay?: number;
    animationDuration?: number;
    animationThreshold?: number;
    animationRootMargin?: string;
    className?: string;
    classNames?: SectionClassNames;
}
