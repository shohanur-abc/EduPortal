import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"

// ─── Internal ─────────────────────────────────────────────────────────────────

export type RippleItem = { id: number; x: number; y: number; size: number }

// ─── Public API ───────────────────────────────────────────────────────────────

export interface ButtonClassNames {
    root?: string
    leftIcon?: string
    rightIcon?: string
    spinner?: string
    badge?: string
    label?: string
}

export interface ExtendedButtonProps
    extends Omit<React.ComponentProps<"button">, "children" | "href">,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode

    // ── Form type ──────────────────────────────────────────────────────────────
    /** Native button type (default: "button") */
    type?: "button" | "submit" | "reset"

    // ── Icons ──────────────────────────────────────────────────────────────────
    /** Icon rendered before the label */
    leftIcon?: React.ReactNode
    /** Icon rendered after the label */
    rightIcon?: React.ReactNode
    /** Show only icon (no label). Uses leftIcon (fallback: rightIcon) as the sole content. */
    iconOnly?: boolean

    // ── Loading ────────────────────────────────────────────────────────────────
    /** Replace content with a spinner and disable the button */
    loading?: boolean
    /** Text shown next to the spinner while loading */
    loadingText?: string

    // ── Link mode — automatically enabled when href is provided ───────────────
    href?: string
    target?: string
    rel?: string
    /** Prefetch the linked page in the background (Next.js Link) */
    prefetch?: boolean | null
    /** Replace current history entry instead of pushing (Next.js Link) */
    replace?: boolean
    /** Scroll to the top after navigation (Next.js Link, default true) */
    scroll?: boolean

    // ── Hold behavior — automatically enabled when holdDuration is provided ───
    /** Duration in ms to complete the hold. Providing this enables hold mode. */
    holdDuration?: number
    /** Label shown on the button while the user is holding */
    holdText?: string
    onHold?: () => void

    // ── Delay behavior — automatically enabled when delayDuration is provided ─
    /** Duration in ms before onDelay fires. Providing this enables delay mode. */
    delayDuration?: number
    /** Label shown on the button during the countdown */
    delayText?: string
    onDelay?: () => void

    // ── Tooltip ────────────────────────────────────────────────────────────────
    tooltip?: React.ReactNode
    tooltipSide?: "top" | "right" | "bottom" | "left"
    tooltipAlign?: "start" | "center" | "end"
    tooltipDelayDuration?: number

    // ── Ripple ─────────────────────────────────────────────────────────────────
    /** Material-style ripple effect on click (default: true) */
    ripple?: boolean

    // ── Badge ──────────────────────────────────────────────────────────────────
    /** Numeric or text badge overlaid on the top-right corner (outside the button) */
    badge?: string | number

    // ── Style overrides ────────────────────────────────────────────────────────
    classNames?: ButtonClassNames

    asChild?: boolean
}

