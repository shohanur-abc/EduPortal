"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<typeof Button>

// ============= COMPONENT =============
export function ConfirmDialog({
    trigger,
    title,
    description,
    confirmLabel = "Continue",
    cancelLabel = "Cancel",
    variant = "destructive",
    onConfirm,
    children,
}: ConfirmDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger ?? children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction className={cn(variant === "destructive" && "bg-destructive text-white hover:bg-destructive/90")} onClick={onConfirm}>
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// ============= TYPES =============
interface ConfirmDialogProps {
    trigger?: React.ReactNode
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: ButtonProps["variant"]
    onConfirm?: () => void
    children?: React.ReactNode
}
