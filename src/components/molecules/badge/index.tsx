"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "@/lib/icon";

import { Badge as BaseBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { badgeMoleculeVariants, badgeDotVariants, badgeGroupGapVariants } from "./variants";
import type { BadgeProps, BadgeGroupProps } from "./types";

export type { BadgeClassNames, BadgeGroupClassNames, BadgeProps, BadgeGroupProps, BadgeVariant, BadgeSize } from "./types";
export { badgeMoleculeVariants, badgeDotVariants, badgeGroupGapVariants } from "./variants";

// ============= MAIN COMPONENT =============

export function BadgeMolecule({
    label,
    icon: Icon,
    iconPosition = "start",
    variant = "default",
    size = "default",
    dot,
    dotColor,
    pill,
    dismissible,
    onDismiss,
    href,
    external,
    onClick,
    disabled,
    ariaLabel,
    className,
    classNames: cns,
    children,
}: BadgeProps) {
    const isInteractive = !!(href || onClick);

    const content = (
        <>
            {dot && (
                <span
                    data-slot="badge-dot"
                    className={cn(
                        badgeDotVariants({ size }),
                        dotColor || "bg-current",
                        cns?.dot
                    )}
                />
            )}
            {Icon && iconPosition === "start" && (
                <Icon
                    data-icon="inline-start"
                    className={cn(cns?.icon)}
                />
            )}
            {children ?? (
                label !== undefined && (
                    <span data-slot="badge-label" className={cn(cns?.label)}>
                        {label}
                    </span>
                )
            )}
            {Icon && iconPosition === "end" && (
                <Icon
                    data-icon="inline-end"
                    className={cn(cns?.icon)}
                />
            )}
            {dismissible && (
                <button
                    type="button"
                    data-slot="badge-dismiss"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDismiss?.();
                    }}
                    className={cn(
                        "inline-flex shrink-0 items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer",
                        size === "sm" && "size-2.5",
                        size === "default" && "size-3",
                        size === "lg" && "size-3.5",
                        cns?.dismiss
                    )}
                    aria-label="Dismiss"
                >
                    <X className="size-full" />
                </button>
            )}
        </>
    );

    const badgeClasses = cn(
        badgeMoleculeVariants({ size }),
        pill && "min-w-5 px-1 font-mono tabular-nums",
        isInteractive && "cursor-pointer",
        disabled && "pointer-events-none opacity-50",
        cns?.root,
        className
    );

    if (href) {
        return (
            <BaseBadge
                variant={variant}
                className={badgeClasses}
                aria-label={ariaLabel}
                asChild
            >
                <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                >
                    {content}
                </Link>
            </BaseBadge>
        );
    }

    return (
        <BaseBadge
            variant={variant}
            className={badgeClasses}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-disabled={disabled}
        >
            {content}
        </BaseBadge>
    );
}

// ============= BADGE GROUP =============

export function BadgeGroup({
    badges,
    max,
    overflowVariant = "secondary",
    size = "default",
    gap = "default",
    className,
    classNames: cns,
}: BadgeGroupProps) {
    const visible = max ? badges.slice(0, max) : badges;
    const overflow = max ? badges.length - max : 0;

    return (
        <div
            data-slot="badge-group"
            className={cn(badgeGroupGapVariants({ gap }), cns?.root, className)}
        >
            {visible.map((badge, i) => (
                <BadgeMolecule
                    key={badge.label?.toString() ?? i}
                    size={size}
                    {...badge}
                    className={cn(cns?.badge, badge.className)}
                />
            ))}
            {overflow > 0 && (
                <BaseBadge
                    variant={overflowVariant}
                    className={cn(
                        badgeMoleculeVariants({ size }),
                        "min-w-5 px-1 font-mono tabular-nums",
                        cns?.overflow
                    )}
                >
                    +{overflow}
                </BaseBadge>
            )}
        </div>
    );
}
