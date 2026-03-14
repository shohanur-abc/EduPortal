"use client"

import { AlertCircle } from "@/lib/icon"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorAlertProps {
    title?: string
    message: string
    onRetry?: () => void
}

export function ErrorAlert({
    title = "Error",
    message,
    onRetry
}: ErrorAlertProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message} {" "}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="underline hover:no-underline"
                    >
                        Try again
                    </button>
                )}
            </AlertDescription>
        </Alert>
    )
}
