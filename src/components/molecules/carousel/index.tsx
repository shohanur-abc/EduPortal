"use client";

import * as React from "react";

import {
    Carousel as CarouselRoot,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { carouselDotVariants } from "./variants";
import type { CarouselProps } from "./types";

export type { CarouselClassNames, CarouselSlideDef, CarouselProps, CarouselOrientation } from "./types";
export { carouselDotVariants, carouselCounterVariants } from "./variants";

// ============= MAIN COMPONENT =============

export function CarouselMolecule({
    slides,
    orientation = "horizontal",
    showArrows = true,
    showDots = false,
    showCounter = false,
    autoPlay,
    loop = false,
    slidesPerView,
    slideBasis,
    dragFree = false,
    align = "start",
    arrowVariant = "outline",
    arrowSize = "icon-sm",
    className,
    classNames: cns,
    setApi: externalSetApi,
}: CarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Auto-play
    React.useEffect(() => {
        if (!api || !autoPlay) return;

        const interval = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else if (loop) {
                api.scrollTo(0);
            }
        }, autoPlay);

        return () => clearInterval(interval);
    }, [api, autoPlay, loop]);

    const handleSetApi = (carouselApi: CarouselApi) => {
        setApi(carouselApi);
        externalSetApi?.(carouselApi);
    };

    const basisClass = slideBasis
        ?? (slidesPerView ? `basis-1/${slidesPerView}` : "basis-full");

    return (
        <div data-slot="carousel-molecule" className={cn("w-full", className)}>
            <CarouselRoot
                orientation={orientation}
                opts={{
                    loop,
                    dragFree,
                    align,
                }}
                setApi={handleSetApi}
                className={cn(cns?.root)}
            >
                <CarouselContent className={cn(cns?.content)}>
                    {slides.map((slide, i) => (
                        <CarouselItem
                            key={slide.key ?? i}
                            className={cn(basisClass, cns?.item, slide.className)}
                        >
                            {slide.content}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showArrows && (
                    <>
                        <CarouselPrevious
                            variant={arrowVariant}
                            size={arrowSize}
                            className={cn(cns?.previous)}
                        />
                        <CarouselNext
                            variant={arrowVariant}
                            size={arrowSize}
                            className={cn(cns?.next)}
                        />
                    </>
                )}
            </CarouselRoot>

            {/* Dots */}
            {showDots && count > 0 && (
                <div
                    data-slot="carousel-dots"
                    className={cn("flex items-center justify-center gap-1.5 mt-3", cns?.dots)}
                >
                    {Array.from({ length: count }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => api?.scrollTo(i)}
                            className={cn(
                                carouselDotVariants({
                                    state: i === current ? "active" : "default",
                                }),
                                i === current ? cns?.dotActive : cns?.dot
                            )}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            {showCounter && count > 0 && (
                <div
                    data-slot="carousel-counter"
                    className={cn(
                        "text-center text-sm text-muted-foreground tabular-nums mt-2",
                        cns?.counter
                    )}
                >
                    {current + 1} / {count}
                </div>
            )}
        </div>
    );
}
