"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function ChartMethodsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load payment methods chart." onRetry={reset} />
}
