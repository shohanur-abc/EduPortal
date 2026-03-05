import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
// import { SessionProvider } from "next-auth/react"

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        //<SessionProvider>
        <TooltipProvider>
            {children}
            <Toaster />
        </TooltipProvider>
        //</SessionProvider>
    )
}