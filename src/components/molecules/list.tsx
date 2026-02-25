"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

export const List = ({ items, icon: I1, className, classNames: cns }: ListProps) => (
    <div className={cn("grid grid-cols-1 @xl:grid-cols-2 gap-3 pt-2", className)}>
        {items.map(({ icon: I2, title, content }, i) => {
            const Icon = I2 || I1; // Use item icon, then default icon, then fallback to index number
            const iconType = Icon ? 'icon' : 'number';
            const isContentString = typeof content === 'string'
            return (
                <ul key={i} className={cn("flex items-center gap-3", content && 'items-start', cns?.item)}>
                    <li className={cn(iconWrapperVariant({ iconType, title: !!title, text: !!content }), cns?.iconWrapper)}>
                        {Icon ? <Icon className={cn(title ? "size-5" : "size-4", cns?.icon)} /> : <span>{i + 1}</span>}
                    </li>
                    <li>
                        {title && <p className={cn("text-sm font-semibold text-foreground", cns?.title)}>{title}</p>}
                        {isContentString ? <p className={cn("text-sm text-muted-foreground", cns?.content)}>{content}</p> : <div className={cns?.content}>{content}</div>}
                    </li>
                </ul>
            )
        })}
    </div>
);

// ============= TYPES =============
const iconWrapperVariant = cva("size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", {
    variants: {
        iconType: { icon: '', number: '' },
        title: { true: '', false: '', },
        text: { true: '', false: '', }
    },
    compoundVariants: [
        {
            // number+title+optional
            iconType: 'number',
            title: true,
            className: 'border-2',
        },
        {
            // number+text
            iconType: 'number',
            title: false,
            text: true,
            className: 'size-5 items-start outline-2 text-sm',
        },
        {
            // icon+title+text
            iconType: 'icon',
            title: true,
            text: true,
            className: 'size-10 rounded-lg',
        },
        {
            // icon+title
            iconType: 'icon',
            title: true,
            text: false,
            className: 'bg-transparent size-fit text-muted-foreground',
        },
        {
            // icon+text
            iconType: 'icon',
            title: false,
            text: true,
            className: 'bg-transparent items-start mt-0.5 size-fit',
        },


    ],
});


// ============= TYPES =============
interface ListProps {
    className?: string;
    classNames?: {
        item?: string;
        iconWrapper?: string;
        icon?: string;
        title?: string;
        content?: string;
    };
    icon?: React.ElementType;
    items: {
        icon?: React.ElementType;
        title?: string;
        content?: React.ReactNode;
    }[];
}