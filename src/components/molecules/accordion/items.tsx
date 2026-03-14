import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    accordionItemVariants,
    accordionTriggerVariants,
} from "./variants";
import type { AccordionProps, AccordionItemDef, AccordionClassNames } from "./types";


// ============= ITEM RENDERER =============
export function AccordionItemRenderer({
    item,
    variant = "default",
    classNames: cns,
}: {
    item: AccordionItemDef;
    variant?: AccordionProps["variant"];
    classNames?: AccordionClassNames;
}) {
    return (
        <AccordionItem
            value={item.value}
            disabled={item.disabled}
            className={cn(accordionItemVariants({ variant }), item.className, cns?.item)}
        >
            <AccordionTrigger
                className={cn(accordionTriggerVariants({ variant }), cns?.trigger)}
            >
                {item.icon && (
                    <item.icon className={cn("size-4 shrink-0 text-muted-foreground", cns?.triggerIcon)} />
                )}
                <div className="min-w-0 flex-1 text-left">
                    <div className={cn("flex items-center gap-2", cns?.title)}>
                        <span className="truncate">{item.title}</span>
                        {item.badge !== undefined && (
                            <span className={cn(cns?.badge)}>
                                {typeof item.badge === "string" || typeof item.badge === "number" ? (
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                        {item.badge}
                                    </Badge>
                                ) : item.badge}
                            </span>
                        )}
                    </div>
                    {item.description && (
                        <p className={cn("mt-0.5 text-xs font-normal text-muted-foreground", cns?.description)}>
                            {item.description}
                        </p>
                    )}
                </div>
            </AccordionTrigger>
            <AccordionContent className={cn(cns?.content)}>
                <div className={cn("px-4 pb-1", cns?.contentInner)}>
                    {item.content}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
