"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function TableError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load report cards table." onRetry={reset} />
}
