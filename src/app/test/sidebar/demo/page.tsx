"use client"

import * as React from "react"
import { DEMOS } from "./demos"

interface Props {
    searchParams: Promise<{ n?: string }>
}
export default function SidebarDemoPage({ searchParams }: Props) {
    const params = React.use(searchParams)
    const id = Number(params.n ?? 1)
    const demo = DEMOS[id] ?? DEMOS[0]
    const Component = demo.component
    return <Component />
}
