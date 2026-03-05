"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function KpiError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load attendance KPIs." onRetry={reset} />
}
