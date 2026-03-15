"use client";

import * as React from "react";
import {
    Accordion as AccordionPrimitive,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
    accordionRootVariants,
} from "./variants";
import type { AccordionProps } from "./types";
import { AccordionItemRenderer } from "./items";

export type { AccordionClassNames, AccordionItemDef, AccordionSingleProps, AccordionMultiProps, AccordionProps } from "./types";
export { accordionRootVariants, accordionItemVariants, accordionTriggerVariants } from "./variants";



// ============= MAIN COMPONENT =============

export function Accordion({
    items,
    variant = "default",
    className,
    classNames: cns,
    ...props
}: AccordionProps) {
    const sharedProps = {
        className: cn(accordionRootVariants({ variant }), className, cns?.root),
    };

    if (props.type === "multiple") {
        return (
            <AccordionPrimitive
                type="multiple"
                value={props.value}
                onValueChange={props.onValueChange}
                defaultValue={props.defaultValue}
                {...sharedProps}
            >
                {items.map((item) => (
                    <AccordionItemRenderer
                        key={item.value}
                        item={item}
                        variant={variant}
                        classNames={cns}
                    />
                ))}
            </AccordionPrimitive>
        );
    }

    // single (default)
    return (
        <AccordionPrimitive
            type="single"
            value={(props as { value?: string }).value}
            onValueChange={(props as { onValueChange?: (v: string) => void }).onValueChange}
            defaultValue={(props as { defaultValue?: string }).defaultValue}
            collapsible={(props as { collapsible?: boolean }).collapsible ?? true}
            {...sharedProps}
        >
            {items.map((item) => (
                <AccordionItemRenderer
                    key={item.value}
                    item={item}
                    variant={variant}
                    classNames={cns}
                />
            ))}
        </AccordionPrimitive>
    );
}

