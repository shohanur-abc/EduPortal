"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function FormSheet({
    trigger,
    title,
    description,
    submitLabel = "Save",
    side = "right",
    className,
    onSubmit,
    children,
}: FormSheetProps) {
    const [open, setOpen] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) {
            await onSubmit(new FormData(e.currentTarget))
        }
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side} className={cn("sm:max-w-lg", className)}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {description && <SheetDescription>{description}</SheetDescription>}
                </SheetHeader>
                <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
                    <ScrollArea className="flex-1 px-1">
                        <div className="space-y-4 py-4">
                            {children}
                        </div>
                    </ScrollArea>
                    <SheetFooter className="pt-4">
                        <SheetClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button type="submit">{submitLabel}</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

// ============= TYPES =============
interface FormSheetProps {
    trigger: React.ReactNode
    title: string
    description?: string
    submitLabel?: string
    side?: "top" | "right" | "bottom" | "left"
    className?: string
    onSubmit?: (data: FormData) => void | Promise<void>
    children: React.ReactNode
}
