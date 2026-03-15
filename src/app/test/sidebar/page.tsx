import type { Metadata } from "next"
import { SidebarShowcase } from "./showcase"

export const metadata: Metadata = {
    title: "Sidebar System · Dev Showcase",
    description: "Production-grade reusable props-driven sidebar molecule demo.",
}

export default function SidebarTestPage() {
    return <SidebarShowcase />
}
