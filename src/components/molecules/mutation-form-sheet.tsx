"use client"

import * as React from "react"
import { useForm, type DefaultValues, type FieldValues, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form } from "@/components/molecules/form"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActionResult } from "@/types/response"

/**
 * A reusable form sheet that integrates react-hook-form + zod validation
 * with server action mutations. Handles loading, error, and success states.
 *
 * Usage:
 * <MutationFormSheet
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Create Notice"
 *   schema={noticeSchema}
 *   defaultValues={{ title: "", status: "draft" }}
 *   onSubmit={async (data) => await createNotice(data)}
 * >
 *   {(form) => <>
 *     <FormInput name="title" label="Title" />
 *   </>}
 * </MutationFormSheet>
 */
export function MutationFormSheet<T extends FieldValues>({
    open,
    onOpenChange,
    title,
    description,
    schema,
    defaultValues,
    onSubmit,
    submitLabel = "Save",
    side = "right",
    className,
    children,
}: MutationFormSheetProps<T>) {
    const [isPending, setIsPending] = React.useState(false)

    const form = useForm<T>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(schema as any),
        defaultValues,
    })

    // Reset form when opening with new defaults
    React.useEffect(() => {
        if (open) {
            form.reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const handleSubmit = async (data: T) => {
        setIsPending(true)
        try {
            const result = await onSubmit(data)
            if (result.success) {
                toast.success(result.message)
                onOpenChange(false)
                form.reset()
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={side} className={cn("sm:max-w-md px-2", className)}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {description && <SheetDescription>{description}</SheetDescription>}
                </SheetHeader>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Form form={form as any} onSubmit={form.handleSubmit(handleSubmit as any)} className="flex flex-1 flex-col overflow-hidden">
                    <ScrollArea className="flex-1 px-1">
                        <div className="space-y-4 py-4">
                            {children(form as UseFormReturn<T>)}
                        </div>
                    </ScrollArea>
                    <SheetFooter className="pt-10 flex-row justify-between flex-1 *:flex-1">
                        <SheetClose asChild>
                            <Button type="button" variant="outline" disabled={isPending}>
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                            {submitLabel}
                        </Button>
                    </SheetFooter>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

// ============= TYPES =============
interface MutationFormSheetProps<T extends FieldValues> {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: any
    defaultValues: DefaultValues<T>
    onSubmit: (data: T) => Promise<ActionResult>
    submitLabel?: string
    side?: "top" | "right" | "bottom" | "left"
    className?: string
    children: (form: UseFormReturn<T>) => React.ReactNode
}
