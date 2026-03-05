"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function TabsNav({ tabs, className }: TabsNavProps) {
    const pathname = usePathname()
    const activeTab = tabs.find((t) => t.href === pathname)?.value ?? tabs[0]?.value

    return (
        <Tabs value={activeTab} className={cn("w-full", className)}>
            <TabsList variant="line">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} asChild>
                        <Link href={tab.href}>{tab.label}</Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

// ============= TYPES =============
interface TabsNavProps {
    tabs: { label: string; value: string; href: string }[]
    className?: string
}
