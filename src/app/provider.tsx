import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
// import { SessionProvider } from "next-auth/react"

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        //<SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
                {children}
                <Toaster />
            </TooltipProvider>
        </ThemeProvider>
        //</SessionProvider>
    )
}