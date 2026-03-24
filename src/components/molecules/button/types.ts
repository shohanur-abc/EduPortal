import * as React from "react"
import { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"

export type RippleItem = { id: number; x: number; y: number; size: number }

export interface ButtonClassNames {
    root?: string
    leftIcon?: string
    rightIcon?: string
    spinner?: string
    badge?: string
    label?: string
}

type SharedProps = VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    iconOnly?: boolean
    loading?: boolean
    loadingText?: string
    holdDuration?: number
    holdText?: string
    onHold?: () => void
    delayDuration?: number
    delayText?: string
    onDelay?: () => void
    tooltip?: React.ReactNode
    tooltipSide?: "top" | "right" | "bottom" | "left"
    tooltipAlign?: "start" | "center" | "end"
    tooltipDelayDuration?: number
    ripple?: boolean
    badge?: string | number
    classNames?: ButtonClassNames
    asChild?: boolean
    disabled?: boolean
}

// ── Link mode ─────────────────────────────────────────────────────────────────
type LinkButtonProps = SharedProps &
    Omit<ComponentPropsWithoutRef<typeof Link>, 'onClick' | keyof SharedProps> & {
        href: string
        onClick?: (e: React.MouseEvent<HTMLElement>) => void
    }

// ── Button mode ───────────────────────────────────────────────────────────────
type NativeButtonProps = SharedProps &
    Omit<ComponentPropsWithoutRef<"button">, 'onClick' | keyof SharedProps> & {
        href?: never
        onClick?: (e: React.MouseEvent<HTMLElement>) => void
    }

export type ExtendedButtonProps = LinkButtonProps | NativeButtonProps