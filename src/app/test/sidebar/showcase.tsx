"use client"

import { DEMOS } from "./demo/demos"

export function SidebarShowcase() {
    return (
        <div className="space-y-10 p-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Sidebar System</h1>
                <p className="mt-2 text-muted-foreground">
                    Production-grade fully props-driven sidebar molecule. Each demo runs in an isolated full-screen frame — click any to open it directly.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    API: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SidebarLayout</code>,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SidebarPanel</code>,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SidebarBrand</code>,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SidebarUser</code>,{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SidebarInsetHeader</code>
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {DEMOS.map((demo) => (
                    <div key={demo.id} className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="text-sm font-semibold">
                                    {demo.id}. {demo.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">{demo.description}</p>
                            </div>
                            <a
                                href={`/test/sidebar/demo?n=${demo.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 text-xs text-primary underline underline-offset-2"
                            >
                                Open ↗
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-lg border h-[460px]">
                            <iframe
                                src={`/test/sidebar/demo?n=${demo.id}`}
                                className="size-full"
                                title={demo.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
