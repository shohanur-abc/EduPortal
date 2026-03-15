import type { Metadata } from "next"
import { DropdownShowcase } from "./showcase"

export const metadata: Metadata = {
    title: "Dropdown System · Dev Showcase",
    description: "Production-grade reusable props-driven dropdown molecule demo.",
}

export default function DropdownTestPage() {
    return <DropdownShowcase />
}
