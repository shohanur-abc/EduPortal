"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function ChartTrendError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load weekly trend chart." onRetry={reset} />
}
