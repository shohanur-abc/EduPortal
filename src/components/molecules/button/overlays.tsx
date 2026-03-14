import * as React from "react"
import type { RippleItem } from "./types"

// ─── Ripple ───────────────────────────────────────────────────────────────────

export function RippleLayer({ ripples }: { ripples: RippleItem[] }) {
    return (
        <>
            {ripples.map((r) => (
                <span
                    key={r.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-full bg-current opacity-10"
                    style={{
                        left: r.x - r.size / 2,
                        top: r.y - r.size / 2,
                        width: r.size,
                        height: r.size,
                        animation: "btn-ripple 600ms linear forwards",
                    }}
                />
            ))}
        </>
    )
}

// ─── Hold progress overlay ────────────────────────────────────────────────────
// A bottom fill-bar + subtle dim gives a clear, variant-agnostic visual cue.

export function HoldOverlay({ progress }: { progress: number }) {
    return (
        <>
            {/* Dim the whole button slightly while holding */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black/10 dark:bg-white/10 transition-none"
            />
            {/* Progress bar that fills from left to right along the bottom */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-0.75 rounded-[inherit] bg-white/70 dark:bg-white/50 transition-none"
                style={{ width: `${progress}%` }}
            />
        </>
    )
}

// ─── Delay progress overlay ───────────────────────────────────────────────────

export function DelayOverlay({ progress }: { progress: number }) {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-left rounded-[inherit] bg-current opacity-15 transition-none"
            style={{ transform: `scaleX(${progress / 100})` }}
        />
    )
}
