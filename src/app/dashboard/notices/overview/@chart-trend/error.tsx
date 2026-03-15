"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function ChartTrendError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load publish trend chart." onRetry={reset} />
}
