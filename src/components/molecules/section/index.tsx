"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { sectionAnimations, type SectionAnimationPreset } from "./animations";
import { useSectionMotion } from "./use-section-motion";
import {
    sectionContentVariants,
    sectionDividerVariants,
    sectionEyebrowVariants,
    sectionHeaderVariants,
    sectionInnerVariants,
    sectionRootVariants,
    sectionSubtitleVariants,
    sectionTitleVariants,
} from "./variants";
import type { SectionContentLayout, SectionProps } from "./types";

export type {
    SectionAlign,
    SectionAnimationName,
    SectionClassNames,
    SectionContentLayout,
    SectionPadding,
    SectionProps,
    SectionRadius,
    SectionShadow,
    SectionSurface,
    SectionWidth,
} from "./types";
export type { SectionAnimationPreset, SectionMotionState } from "./animations";
export { sectionAnimations };

function resolveContentLayout(layout: SectionProps["contentLayout"], childrenCount: number): SectionContentLayout {
    if (layout && layout !== "auto") return layout;
    if (childrenCount <= 1) return "stack";
    if (childrenCount <= 4) return "grid-2";
    if (childrenCount <= 8) return "grid-3";
    return "grid-4";
}

function resolveAnimationPreset(animation: SectionProps["animation"]): SectionAnimationPreset {
    if (!animation) return sectionAnimations.fadeIn;
    if (typeof animation === "string") return sectionAnimations[animation] ?? sectionAnimations.fadeIn;
    return animation;
}

export function Section({
    id,
    role,
    ariaLabel,
    ariaLabelledby,
    children,
    decorative,
    eyebrow,
    title,
    subtitle,
    actions,
    divider = false,
    align = "left",
    width = "xl",
    padding = "lg",
    surface = "none",
    radius = "none",
    shadow = "none",
    containerized = true,
    contentLayout = "auto",
    contentMinItemWidth,
    animation,
    animationState,
    animateOnView = false,
    animationOnce = true,
    animationDelay = 0,
    animationDuration,
    animationThreshold = 0.25,
    animationRootMargin = "0px",
    className,
    classNames: cns,
}: SectionProps) {
    const childrenCount = React.Children.count(children);
    const resolvedLayout = resolveContentLayout(contentLayout, childrenCount);
    const animationPreset = resolveAnimationPreset(animation);

    const { setMotionNode, motionState } = useSectionMotion({
        animateOnView,
        once: animationOnce,
        controlledState: animationState,
        initialState: animateOnView ? "out" : "in",
        threshold: animationThreshold,
        rootMargin: animationRootMargin,
    });

    const headerVisible = !!(eyebrow || title || subtitle || actions || divider);

    return (
        <section
            ref={setMotionNode}
            id={id}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            className={cn(sectionRootVariants({ surface, radius, shadow }), cns?.root, className)}
        >
            {decorative && <div className={cn("pointer-events-none absolute inset-0", cns?.decorative)}>{decorative}</div>}

            <div
                className={cn(
                    sectionInnerVariants({ width, padding, containerized }),
                    animationPreset.base,
                    motionState === "in" ? animationPreset.enter : animationPreset.exit,
                    cns?.motion,
                    cns?.inner
                )}
                style={{
                    animationDelay: `${animationDelay}ms`,
                    animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
                }}
            >
                {headerVisible && (
                    <header className={cn(sectionHeaderVariants({ align }), cns?.header)}>
                        {eyebrow && <div className={cn(sectionEyebrowVariants(), cns?.eyebrow)}>{eyebrow}</div>}
                        {title && <h2 className={cn(sectionTitleVariants(), cns?.title)}>{title}</h2>}
                        {subtitle && <p className={cn(sectionSubtitleVariants(), cns?.subtitle)}>{subtitle}</p>}
                        {actions && <div className={cn("flex flex-wrap items-center gap-2", cns?.actions)}>{actions}</div>}
                        {divider && <div className={cn(sectionDividerVariants(), cns?.divider)} />}
                    </header>
                )}

                <div
                    className={cn(sectionContentVariants({ layout: resolvedLayout }), cns?.content)}
                    style={
                        contentMinItemWidth
                            ? {
                                gridTemplateColumns:
                                    resolvedLayout === "stack" ? undefined : `repeat(auto-fit, minmax(${contentMinItemWidth}, 1fr))`,
                            }
                            : undefined
                    }
                >
                    {children}
                </div>
            </div>
        </section>
    );
}

