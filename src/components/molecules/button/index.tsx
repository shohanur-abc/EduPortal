"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button as BaseButton, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { RippleLayer, HoldOverlay, DelayOverlay } from "./overlays"
import { useRipple, useHold, useDelay } from "./use-button-effects"
import type { ExtendedButtonProps } from "./types"
export type { ExtendedButtonProps, ButtonClassNames } from "./types"
export { buttonVariants }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveIconSize(
    size: ExtendedButtonProps["size"]
): ExtendedButtonProps["size"] {
    if (size === "xs") return "icon-xs"
    if (size === "sm") return "icon-sm"
    if (size === "lg") return "icon-lg"
    return "icon"
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Button({
    children,
    leftIcon,
    rightIcon,
    iconOnly = false,
    loading = false,
    loadingText,
    // Link — automatically enabled when href is provided
    href,
    target,
    rel,
    prefetch,
    replace,
    scroll,
    // Hold — automatically enabled when holdDuration is provided
    holdDuration,
    holdText,
    onHold,
    // Delay — automatically enabled when delayDuration is provided
    delayDuration,
    delayText,
    onDelay,
    // Tooltip
    tooltip,
    tooltipSide = "top",
    tooltipAlign = "center",
    tooltipDelayDuration = 300,
    // Ripple
    ripple = true,
    // Badge
    badge,
    // Styling
    classNames: cns,
    variant = "default",
    size,
    disabled,
    className,
    onClick,
    type = "button",
    ...props
}: ExtendedButtonProps) {
    const isLink = !!href
    const holdEnabled = holdDuration !== undefined
    const delayEnabled = delayDuration !== undefined
    const isDisabled = disabled || loading

    const { ripples, addRipple } = useRipple()

    const { progress: holdProgress, isHolding, start: startHold, cancel: cancelHold } = useHold({
        enabled: holdEnabled,
        duration: holdDuration ?? 800,
        onHold,
        disabled: !!isDisabled,
    })

    const { isDelaying, progress: delayProgress, start: startDelay } = useDelay({
        enabled: delayEnabled,
        duration: delayDuration ?? 2000,
        onDelay,
    })

    const isActuallyDisabled = !!isDisabled || isDelaying
    const resolvedSize = iconOnly ? resolveIconSize(size) : size

    // ── Handlers ──────────────────────────────────────────────────────────────
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (ripple) addRipple(e)
        // Hold mode: block regular click; action fires only via onHold after hold completes
        if (holdEnabled) return
        if (delayEnabled) startDelay()
        onClick?.(e)
    }

    // ── Label resolution ──────────────────────────────────────────────────────
    const resolvedLabel =
        isHolding && holdText ? holdText :
            isDelaying && delayText ? delayText :
                children

    // ── Inner content ─────────────────────────────────────────────────────────
    const icon = iconOnly ? (leftIcon ?? rightIcon) : null

    const content = (
        <>
            {ripple && <RippleLayer ripples={ripples} />}
            {holdEnabled && (isHolding || holdProgress > 0) && <HoldOverlay progress={holdProgress} />}
            {isDelaying && <DelayOverlay progress={delayProgress} />}

            {loading ? (
                <>
                    <Loader2 className={cn("animate-spin", cns?.spinner)} />
                    {loadingText && <span className={cns?.label}>{loadingText}</span>}
                </>
            ) : iconOnly ? (
                icon
            ) : (
                <>
                    {leftIcon && (
                        <span data-slot="btn-left-icon" className={cns?.leftIcon}>
                            {leftIcon}
                        </span>
                    )}
                    {resolvedLabel && (
                        <span data-slot="btn-label" className={cns?.label}>
                            {resolvedLabel}
                        </span>
                    )}
                    {rightIcon && (
                        <span data-slot="btn-right-icon" className={cns?.rightIcon}>
                            {rightIcon}
                        </span>
                    )}
                </>
            )}
        </>
    )

    // ── Button props ──────────────────────────────────────────────────────────
    // Spread user props first so our handlers always win when there's a conflict
    const btnProps = {
        ...props,
        "data-slot": "button",
        variant,
        size: resolvedSize,
        disabled: isActuallyDisabled,
        type: isLink ? undefined : type,
        "aria-busy": loading || undefined,
        className: cn("relative overflow-hidden", cns?.root, className),
        onMouseDown: holdEnabled ? () => startHold() : undefined,
        onMouseUp: holdEnabled ? () => cancelHold() : undefined,
        onMouseLeave: holdEnabled ? () => cancelHold() : undefined,
        onTouchStart: holdEnabled ? () => startHold() : undefined,
        onTouchEnd: holdEnabled ? () => cancelHold() : undefined,
        onClick: handleClick,
    }

    // ── Core button/link element ──────────────────────────────────────────────
    const buttonEl = isLink ? (
        <BaseButton {...btnProps} asChild>
            <Link
                href={href}
                target={target}
                rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
                prefetch={prefetch}
                replace={replace}
                scroll={scroll}
            >
                {content}
            </Link>
        </BaseButton>
    ) : (
        <BaseButton {...btnProps}>{content}</BaseButton>
    )

    // ── Badge wrapper — lives outside button so it isn't clipped ─────────────
    const withBadge =
        badge !== undefined ? (
            <span className="relative inline-flex">
                {buttonEl}
                <span
                    aria-label={`Badge: ${badge}`}
                    className={cn(
                        "pointer-events-none absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground",
                        cns?.badge
                    )}
                >
                    {badge}
                </span>
            </span>
        ) : buttonEl

    // ── Tooltip wrapper ───────────────────────────────────────────────────────
    if (!tooltip) return withBadge

    return (
        <TooltipProvider delayDuration={tooltipDelayDuration}>
            <Tooltip>
                <TooltipTrigger asChild>{withBadge}</TooltipTrigger>
                <TooltipContent side={tooltipSide} align={tooltipAlign}>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { Button as Button }
