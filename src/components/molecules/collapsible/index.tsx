"use client";

import * as React from "react";
import { ChevronDown } from "@/lib/icon";
import {
    Collapsible as CollapsiblePrimitive,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { collapsibleRootVariants, collapsibleTriggerVariants } from "./variants";
import type { CollapsibleProps } from "./types";

export type { CollapsibleClassNames, CollapsibleProps } from "./types";
export { collapsibleRootVariants, collapsibleTriggerVariants } from "./variants";

// ============= MAIN COMPONENT =============

export function Collapsible({
    title,
    description,
    icon: Icon,
    children,
    open,
    onOpenChange,
    defaultOpen = false,
    disabled = false,
    variant = "default",
    chevronSide = "right",
    hideChevron = false,
    trigger,
    className,
    classNames: cns,
}: CollapsibleProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    function handleOpenChange(val: boolean) {
        if (!isControlled) setInternalOpen(val);
        onOpenChange?.(val);
    }

    const chevron = !hideChevron && (
        <ChevronDown
            data-slot="collapsible-chevron"
            className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180",
                cns?.triggerIcon
            )}
        />
    );

    const defaultTrigger = (
        <CollapsibleTrigger
            disabled={disabled}
            className={cn(
                collapsibleTriggerVariants({ variant, disabled }),
                chevronSide === "left" && "flex-row-reverse justify-end",
                cns?.trigger
            )}
        >
            {chevronSide === "left" && chevron}
            <div className={cn("flex min-w-0 flex-1 items-center gap-2", cns?.header)}>
                {Icon && (
                    <Icon className={cn("size-4 shrink-0 text-muted-foreground", cns?.triggerIcon)} />
                )}
                <div className="min-w-0 flex-1 text-left">
                    <div className={cn("truncate font-medium", cns?.title)}>{title}</div>
                    {description && (
                        <div className={cn("mt-0.5 truncate text-xs text-muted-foreground", cns?.description)}>
                            {description}
                        </div>
                    )}
                </div>
            </div>
            {chevronSide === "right" && chevron}
        </CollapsibleTrigger>
    );

    return (
        <CollapsiblePrimitive
            open={isOpen}
            onOpenChange={handleOpenChange}
            className={cn(collapsibleRootVariants({ variant }), className, cns?.root)}
        >
            {trigger ?? defaultTrigger}
            <CollapsibleContent className={cn("overflow-hidden", cns?.content)}>
                <div className={cn("px-4 pb-4 pt-1", cns?.contentInner)}>{children}</div>
            </CollapsibleContent>
        </CollapsiblePrimitive>
    );
}
