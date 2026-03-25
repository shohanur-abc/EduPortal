"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2 } from "@/lib/icon"
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
    tooltipDefaultOpen = false,
    // Ripple
    ripple = false,
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
    ...restProps
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
    function handleClick(e: React.MouseEvent<HTMLElement>) {
        if (ripple) addRipple(e as React.MouseEvent<HTMLButtonElement>)
        // Hold mode: block regular click; action fires only via onHold after hold completes
        if (holdEnabled) return
        if (delayEnabled) startDelay()
        if (onClick) {
            onClick(e as React.MouseEvent<HTMLButtonElement>)
        }
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
    const commonProps = {
        "data-slot": "button",
        variant,
        size: resolvedSize,
        disabled: isActuallyDisabled,
        "aria-busy": loading || undefined,
        className: cn("relative overflow-hidden", cns?.root, className),
        onMouseDown: holdEnabled ? () => startHold() : undefined,
        onMouseUp: holdEnabled ? () => cancelHold() : undefined,
        onMouseLeave: holdEnabled ? () => cancelHold() : undefined,
        onTouchStart: holdEnabled ? () => startHold() : undefined,
        onTouchEnd: holdEnabled ? () => cancelHold() : undefined,
        onClick: handleClick,
    } as React.ComponentProps<typeof BaseButton>

    // Only use restProps for button mode, not for link mode
    const buttonModeProps = !isLink ? (restProps as React.ComponentProps<'button'>) : {}

    const buttonProps = {
        ...buttonModeProps,
        ...commonProps,
        type: !isLink ? (type as "button" | "submit" | "reset") : undefined,
    } as React.ComponentProps<typeof BaseButton>

    const linkProps = {
        ...commonProps,
        asChild: true,
    } as React.ComponentProps<typeof BaseButton> & { asChild: true }

    // ── Core button/link element ──────────────────────────────────────────────
    const buttonEl = isLink && href ? (
        <BaseButton {...linkProps}>
            <Link href={href}>
                {content}
            </Link>
        </BaseButton>
    ) : (
        <BaseButton {...buttonProps}>{content}</BaseButton>
    )

    // ── Badge wrapper — lives outside button so it isn't clipped ─────────────
    const withBadge =
        badge !== undefined ? (
            <span className="relative inline-flex">
                {buttonEl}
                <span
                    aria-label={`Badge: ${badge}`}
                    className={cn("pointer-events-none absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground", cns?.badge)}
                >
                    {badge}
                </span>
            </span>
        ) : buttonEl

    // ── Tooltip wrapper ───────────────────────────────────────────────────────
    if (!tooltip) return withBadge

    return (
        <TooltipProvider delayDuration={tooltipDelayDuration} >
            <Tooltip defaultOpen={tooltipDefaultOpen}>
                <TooltipTrigger asChild>{withBadge}</TooltipTrigger>
                <TooltipContent side={tooltipSide} align={tooltipAlign}>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { Button as Button }
