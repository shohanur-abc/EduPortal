"use client"

import { ErrorAlert } from "@/components/molecules/error-alert"

export default function FeedError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorAlert title="Error" message="Failed to load recent activity." onRetry={reset} />
}
