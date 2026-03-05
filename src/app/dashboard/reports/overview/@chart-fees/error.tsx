"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function ChartFeesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load fee collection chart." onRetry={reset} />
}
