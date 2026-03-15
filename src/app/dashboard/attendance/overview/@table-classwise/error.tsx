"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function TableClasswiseError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load class-wise attendance." onRetry={reset} />
}
