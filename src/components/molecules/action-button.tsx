"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

type ButtonProps = React.ComponentProps<typeof Button>

/**
 * A button that calls a server action and handles loading/toast.
 *
 * Usage:
 * <ActionButton action={() => publishNotice(id)} label="Publish" variant="default" />
 */
export function ActionButton({ action, label, icon: Icon, successMessage, className, ...props }: ActionButtonProps) {
    const [isPending, setIsPending] = React.useState(false)

    const handleClick = async () => {
        setIsPending(true)
        try {
            const result = await action()
            if (result.success) {
                toast.success(successMessage ?? result.message)
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Something went wrong.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button onClick={handleClick} disabled={isPending} className={className} {...props}>
            {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : Icon ? <Icon className="mr-2 size-4" /> : null}
            {label}
        </Button>
    )
}

// ============= IMPORTS =============
import { ActionResult } from "@/types/response"

// ============= TYPES =============

interface ActionButtonProps extends Omit<ButtonProps, "onClick"> {
    action: () => Promise<ActionResult>
    label: string
    icon?: React.ComponentType<{ className?: string }>
    successMessage?: string
}
