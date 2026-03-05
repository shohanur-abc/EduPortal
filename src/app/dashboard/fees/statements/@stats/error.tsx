"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function StatsError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <ErrorAlert
            title="Error"
            message="Failed to load fee statement statistics."
            onRetry={reset}
        />
    )
}
