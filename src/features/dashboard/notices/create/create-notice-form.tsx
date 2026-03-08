"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox as CB } from "@/components/ui/checkbox"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules/select"
import { DatePicker } from "@/components/molecules/date-picker"
import { Form } from "@/components/molecules/form"
import {
    EditorProvider,
    EditorBubbleMenu,
    EditorFloatingMenu,
    EditorFormatBold,
    EditorFormatItalic,
    EditorFormatStrike,
    EditorFormatUnderline,
    EditorFormatCode,
    EditorFormatSuperscript,
    EditorFormatSubscript,
    EditorNodeText,
    EditorNodeHeading1,
    EditorNodeHeading2,
    EditorNodeHeading3,
    EditorNodeBulletList,
    EditorNodeOrderedList,
    EditorNodeTaskList,
    EditorNodeQuote,
    EditorNodeCode,
    EditorNodeTable,
    EditorSelector,
    EditorLinkSelector,
    EditorClearFormatting,
    EditorTableMenu,
    EditorTableColumnMenu,
    EditorTableColumnBefore,
    EditorTableColumnAfter,
    EditorTableColumnDelete,
    EditorTableRowMenu,
    EditorTableRowBefore,
    EditorTableRowAfter,
    EditorTableRowDelete,
    EditorTableGlobalMenu,
    EditorTableHeaderColumnToggle,
    EditorTableHeaderRowToggle,
    EditorTableDelete,
    EditorTableMergeCells,
    EditorTableSplitCell,
    EditorTableFix,
    EditorCharacterCount,
    type JSONContent,
} from "@/components/kibo-ui/editor"
import { noticeSchema, type NoticeFormData } from "@/features/dashboard/validators"
import { postOne } from "@/services/notices"
import { toast } from "sonner"
import { Loader2, Send, FileText, Eye, PenLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"

export function CreateNoticeForm() {
    const [isPending, setIsPending] = React.useState(false)
    const [preview, setPreview] = React.useState(false)
    const [htmlPreview, setHtmlPreview] = React.useState("")
    const router = useRouter()

    const form = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: "",
            content: "",
            priority: "medium",
            targetAudience: ["all"],
            publishDate: new Date().toISOString().split("T")[0],
            expiryDate: undefined,
            status: "draft",
        },
    })

    const onSubmit = async (data: NoticeFormData) => {
        setIsPending(true)
        try {
            const result = await postOne(data)
            if (result.success) {
                toast.success(result.message)
                form.reset()
                router.push(ROUTES.dashboard.notices.manage)
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
        <Card className="max-w-3xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Create New Notice</CardTitle>
                            <CardDescription>Fill in the details below to create and publish a notice.</CardDescription>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreview(!preview)}
                        className="gap-2"
                    >
                        {preview ? <PenLine className="size-4" /> : <Eye className="size-4" />}
                        {preview ? "Edit" : "Preview"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Enter notice title"
                    />

                    {/* Rich Text Editor / Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>

                        {preview ? (
                            <div
                                className="prose prose-sm max-w-none dark:prose-invert rounded-md border p-4 min-h-[200px]"
                                dangerouslySetInnerHTML={{ __html: htmlPreview || "<p class='text-muted-foreground'>Nothing to preview yet...</p>" }}
                            />
                        ) : (
                            <EditorProvider
                                className="min-h-[200px] w-full overflow-y-auto rounded-lg border bg-background p-4"
                                content={form.getValues("content") || undefined}
                                placeholder="Start typing... Use / for slash commands"
                                onUpdate={({ editor }) => {
                                    const html = editor.getHTML()
                                    form.setValue("content", html, { shouldValidate: true })
                                    setHtmlPreview(html)
                                }}
                            >
                                <EditorFloatingMenu>
                                    <EditorNodeHeading1 hideName />
                                    <EditorNodeBulletList hideName />
                                    <EditorNodeQuote hideName />
                                    <EditorNodeCode hideName />
                                    <EditorNodeTable hideName />
                                </EditorFloatingMenu>
                                <EditorBubbleMenu>
                                    <EditorSelector title="Text">
                                        <EditorNodeText />
                                        <EditorNodeHeading1 />
                                        <EditorNodeHeading2 />
                                        <EditorNodeHeading3 />
                                        <EditorNodeBulletList />
                                        <EditorNodeOrderedList />
                                        <EditorNodeTaskList />
                                        <EditorNodeQuote />
                                        <EditorNodeCode />
                                    </EditorSelector>
                                    <EditorSelector title="Format">
                                        <EditorFormatBold />
                                        <EditorFormatItalic />
                                        <EditorFormatUnderline />
                                        <EditorFormatStrike />
                                        <EditorFormatCode />
                                        <EditorFormatSuperscript />
                                        <EditorFormatSubscript />
                                    </EditorSelector>
                                    <EditorLinkSelector />
                                    <EditorClearFormatting />
                                </EditorBubbleMenu>
                                <EditorTableMenu>
                                    <EditorTableColumnMenu>
                                        <EditorTableColumnBefore />
                                        <EditorTableColumnAfter />
                                        <EditorTableColumnDelete />
                                    </EditorTableColumnMenu>
                                    <EditorTableRowMenu>
                                        <EditorTableRowBefore />
                                        <EditorTableRowAfter />
                                        <EditorTableRowDelete />
                                    </EditorTableRowMenu>
                                    <EditorTableGlobalMenu>
                                        <EditorTableHeaderColumnToggle />
                                        <EditorTableHeaderRowToggle />
                                        <EditorTableDelete />
                                        <EditorTableMergeCells />
                                        <EditorTableSplitCell />
                                        <EditorTableFix />
                                    </EditorTableGlobalMenu>
                                </EditorTableMenu>
                                <EditorCharacterCount.Words>Words: </EditorCharacterCount.Words>
                            </EditorProvider>
                        )}

                        {form.formState.errors.content && (
                            <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select
                            name="priority"
                            label="Priority"
                            options={[
                                { value: "low", label: "Low" },
                                { value: "medium", label: "Medium" },
                                { value: "high", label: "High" },
                                { value: "urgent", label: "Urgent" },
                            ]}
                        />
                        <Select
                            name="status"
                            label="Status"
                            options={[
                                { value: "draft", label: "Draft" },
                                { value: "published", label: "Published" },
                            ]}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Target Audience</label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {(["all", "admin", "teacher", "student", "parent"] as const).map((audience) => {
                                const current = form.watch("targetAudience") || []
                                const checked = current.includes(audience)
                                return (
                                    <label key={audience} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <CB
                                            checked={checked}
                                            onCheckedChange={(v) => {
                                                if (v) form.setValue("targetAudience", [...current, audience])
                                                else form.setValue("targetAudience", current.filter((a) => a !== audience))
                                            }}
                                        />
                                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                                    </label>
                                )
                            })}
                        </div>
                        {form.formState.errors.targetAudience && (
                            <p className="text-sm text-destructive">{form.formState.errors.targetAudience.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <DatePicker name="publishDate" label="Publish Date" placeholder="Select publish date" />
                        <DatePicker name="expiryDate" label="Expiry Date (optional)" placeholder="Select expiry date" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
                            Create Notice
                        </Button>
                    </div>
                </Form>
            </CardContent>
        </Card>
    )
}
