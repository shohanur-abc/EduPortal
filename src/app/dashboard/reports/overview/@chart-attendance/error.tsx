"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function ChartAttendanceError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load attendance chart." onRetry={reset} />
}
