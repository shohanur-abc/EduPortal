"use client"

import * as React from "react"
import type { RippleItem } from "./types"

// ─── useRipple ────────────────────────────────────────────────────────────────

export function useRipple() {
    const [ripples, setRipples] = React.useState<RippleItem[]>([])
    const idRef = React.useRef(0)

    function addRipple(e: React.MouseEvent<HTMLElement>) {
        const el = e.currentTarget as HTMLElement
        const rect = el.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2.2
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = ++idRef.current
        setRipples((prev) => [...prev, { id, x, y, size }])
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
    }

    return { ripples, addRipple }
}

// ─── useHold ──────────────────────────────────────────────────────────────────

export function useHold({
    enabled,
    duration,
    onHold,
    disabled,
}: {
    enabled: boolean
    duration: number
    onHold?: () => void
    disabled: boolean
}) {
    const [isHolding, setIsHolding] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const rafRef = React.useRef<number | null>(null)
    const startRef = React.useRef<number>(0)
    // Refs so RAF closure always reads the latest values without re-creating callbacks
    const disabledRef = React.useRef(disabled)
    const enabledRef = React.useRef(enabled)
    const onHoldRef = React.useRef(onHold)

    React.useLayoutEffect(() => { disabledRef.current = disabled }, [disabled])
    React.useLayoutEffect(() => { enabledRef.current = enabled }, [enabled])
    React.useLayoutEffect(() => { onHoldRef.current = onHold }, [onHold])

    React.useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const start = React.useCallback(() => {
        if (!enabledRef.current || disabledRef.current) return
        if (rafRef.current !== null) return // already running
        setIsHolding(true)
        startRef.current = performance.now()

        function tick(now: number) {
            const pct = Math.min(((now - startRef.current) / duration) * 100, 100)
            setProgress(pct)
            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                rafRef.current = null
                setIsHolding(false)
                setProgress(0)
                onHoldRef.current?.()
            }
        }
        rafRef.current = requestAnimationFrame(tick)
    }, [duration])

    const cancel = React.useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        setProgress(0)
        setIsHolding(false)
    }, [])

    return { progress, isHolding, start, cancel }
}

// ─── useDelay ─────────────────────────────────────────────────────────────────

export function useDelay({
    enabled,
    duration,
    onDelay,
}: {
    enabled: boolean
    duration: number
    onDelay?: () => void
}) {
    const [isDelaying, setIsDelaying] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const rafRef = React.useRef<number | null>(null)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const onDelayRef = React.useRef(onDelay)
    React.useLayoutEffect(() => { onDelayRef.current = onDelay }, [onDelay])

    React.useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
        }
    }, [])

    const start = React.useCallback(() => {
        if (!enabled || isDelaying) return
        setIsDelaying(true)
        const startTime = performance.now()

        function tick(now: number) {
            const pct = Math.min(((now - startTime) / duration) * 100, 100)
            setProgress(pct)
            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }
        rafRef.current = requestAnimationFrame(tick)

        timeoutRef.current = setTimeout(() => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
            setProgress(0)
            setIsDelaying(false)
            onDelayRef.current?.()
        }, duration)
    }, [enabled, isDelaying, duration])

    return { isDelaying, progress, start }
}
