"use client"

import React, { useMemo } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const pseudo = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453
    return value - Math.floor(value)
  }

  const meteorStyles = useMemo<Array<React.CSSProperties>>(
    () =>
      [...new Array(number)].map((_, idx) => {
        const angleJitter = pseudo(idx + angle) * 10
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
        const leftOffset = Math.floor(pseudo(idx * 2 + number) * windowWidth)
        const delay = pseudo(idx * 3 + minDelay) * (maxDelay - minDelay) + minDelay
        const duration = Math.floor(pseudo(idx * 4 + maxDuration) * (maxDuration - minDuration) + minDuration)

        return {
          "--angle": -angle + angleJitter + "deg",
          top: "-5%",
          left: `calc(0% + ${leftOffset}px)`,
          animationDelay: delay + "s",
          animationDuration: duration + "s",
        }
      }),
    [number, minDelay, maxDelay, minDuration, maxDuration, angle]
  )

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-primary/20 dark:from-primary shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-primary/20 dark:from-primary animate-pulse to-transparent" />
        </span>
      ))}
    </>
  )
}
