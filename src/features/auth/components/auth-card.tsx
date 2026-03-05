import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ============= MAIN COMPONENT =============
export default function AuthCard({
    title,
    description,
    children,
    footer,
    className,
}: IAuthCard) {
    return (
        <div className="flex min-h-svh items-center justify-center p-4">
            <Card className={cn("w-full max-w-md", className)}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        {title}
                    </CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>{children}</CardContent>
                {footer && (
                    <CardFooter className="flex-col gap-2 text-center">
                        {footer}
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

// ============= CHILD COMPONENTS =============
export const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} className="text-sm text-primary hover:underline font-medium">
        {label}
    </Link>
);

// ============= TYPES =============
interface IAuthCard {
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}
