"use client"

import { ChatContainerContent, ChatContainerRoot } from "@/components/prompt-kit/chat-container"
import { DotsLoader } from "@/components/prompt-kit/loader"
import { Message, MessageAvatar, MessageContent } from "@/components/prompt-kit/message"
import { PromptInput, PromptInputActions, PromptInputTextarea } from "@/components/prompt-kit/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, AlertTriangle, Bot, Sparkles, X } from "@/lib/icon"
import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"

export default function AiChatbotSidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const [input, setInput] = useState("")

    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/primitives/chatbot",
        }),
    })

    const handleSubmit = () => {
        if (!input.trim()) return
        sendMessage({ text: input })
        setInput("")
    }

    return (
        <div className="fixed  right-4 bottom-4 z-40 max-w-sm w-full">
            <aside className="bg-card/95 border-border/70 outline shadow-lg supports-backdrop-filter:bg-card/85 flex h-[min(78vh,680px)]  flex-col overflow-hidden rounded-2xl border backdrop-blur">
                <div className="border-b px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <Sparkles className="text-primary size-4" />
                                <span>AI Assistant</span>
                            </div>
                            <p className="text-muted-foreground mt-1 text-s">
                                Ask anything what you want to know
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground size-8 rounded-full"
                            onClick={() => setOpen(false)}
                            aria-label="Close AI assistant"
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                </div>

                <ChatContainerRoot className="min-h-0 flex-1 overflow-y-auto">
                    <ChatContainerContent className="space-y-4 py-4">
                        {messages.length === 0 && (
                            <Message className="items-start gap-2 px-2 @md:px-0">
                                <MessageAvatar src="" alt="AI" fallback="AI" className="bg-primary/10 text-primary" />
                                <MessageContent
                                    className="bg-muted/70 max-w-full rounded-2xl px-3 py-2 text-sm"
                                    markdown
                                >
                                    {"Hi! I can help with your dashboard tasks. Try: `Summarize fee collection this week`"}
                                </MessageContent>
                            </Message>
                        )}

                        {messages.map((message) => {
                            const isAssistant = message.role === "assistant"
                            return (
                                <Message
                                    key={message.id}
                                    className={cn("w-full items-start", isAssistant ? "justify-start" : "justify-end")}
                                >
                                    {isAssistant && (
                                        <MessageAvatar src="" alt="AI" fallback="AI" className="bg-primary/10 text-primary" />
                                    )}
                                    <MessageContent
                                        markdown={isAssistant}
                                        className={cn(
                                            "max-w-[88%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                                            isAssistant
                                                ? "bg-muted/70 prose prose-sm dark:prose-invert prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-pre:my-2"
                                                : "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        {message.parts
                                            .map((part) => (part.type === "text" ? part.text : null))
                                            .join("")}
                                    </MessageContent>
                                </Message>
                            )
                        })}

                        {(status === "submitted" || status === "streaming") && (
                            <Message className="items-start gap-2">
                                <MessageAvatar src="" alt="AI" fallback="AI" className="bg-primary/10 text-primary" />
                                <div className="bg-muted/70 rounded-xl px-3 py-2">
                                    <DotsLoader size="sm" />
                                </div>
                            </Message>
                        )}

                        {status === "error" && error && (
                            <Message>
                                <div className="flex items-center gap-2 rounded-xl border border-red-300/70 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                                    <AlertTriangle className="size-4" />
                                    <span>{error.message}</span>
                                </div>
                            </Message>
                        )}
                    </ChatContainerContent>
                </ChatContainerRoot>

                <div className="border-t p-3">
                    <PromptInput
                        isLoading={status !== "ready" && status !== "error"}
                        value={input}
                        onValueChange={setInput}
                        onSubmit={handleSubmit}
                        className="bg-accent/30 rounded-2xl p-0"
                    >
                        <div className="flex flex-col overflow-hidden rounded-2xl border">
                            <PromptInputTextarea
                                placeholder="Ask EduPortal AI..."
                                className="min-h-12 px-3 text-sm bg-transparent dark:bg-transparent"
                            />
                            <PromptInputActions className="justify-end p-2 bg-transparent dark:bg-transparent">
                                <Button
                                    size="icon"
                                    className="size-8 rounded-full"
                                    disabled={!input.trim() || (status !== "ready" && status !== "error")}
                                    onClick={handleSubmit}
                                    aria-label="Send message"
                                >
                                    <ArrowUp className="size-4" />
                                </Button>
                            </PromptInputActions>
                        </div>
                    </PromptInput>
                </div>
            </aside>


        </div>
    )
}
