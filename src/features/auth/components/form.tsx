import { Button } from "@/components/ui/button";
import { Card, CardContent as Content, CardDescription as Description, CardFooter as Footer, CardHeader as Header, CardTitle as Title, } from "@/components/ui/card";
import { FieldSeparator as Separator } from "@/components/ui/field";
import Link from "next/link";
import { socialLogin as socialLogin$ } from "../actions";
import { Form } from "@/components/molecules/form";
import type { UseFormReturn, FieldValues } from "react-hook-form";


export const FormCard = <T extends FieldValues = FieldValues,>({ header, children, footer, socialLogin, form, onSubmit, ...formProps }: FormProps<T>) => (

    <div className="flex min-h-svh items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md">
            <Header className="text-center">
                <Title className="text-2xl">{header.title}</Title>
                <Description>{header.description}</Description>
            </Header>
            <Content className="space-y-6">
                <Form form={form} onSubmit={onSubmit} className="space-y-4" {...formProps}>
                    {children}
                </Form>

                {socialLogin && <>
                    <Separator className="mb-2">or continue with</Separator>{
                        socialLogin.map(provider =>
                            <form key={provider} action={socialLogin$.bind(null, provider)}>
                                <Button type="submit" variant="outline" className="w-full gap-2" >
                                    {ICONS[provider]}
                                    Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                                </Button>
                            </form>
                        )}</>}
            </Content>
            <Footer className="justify-center">
                <p className="text-sm text-muted-foreground">
                    {footer.description}{" "}
                    <Link href={footer?.cta?.href || "#"} className="text-primary hover:underline font-medium" >
                        {footer?.cta?.label || "Sign up"}
                    </Link>
                </p>

                {footer.navigate && <Link href={footer.navigate.href} className="text-sm text-primary hover:underline font-medium mt-3" >
                    {footer.navigate.label}
                </Link>}
            </Footer>
        </Card>
    </div>
)


// ============= HELPERS =============
const ICONS = {
    google: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" > <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /> <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /> <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /> <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /> </svg>),
    facebook: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon" > <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> </svg>),
    x: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon" > <path d="M18 6L6 18M6 6l12 12" /> </svg>),
};

// ========== TYPES ==========
interface FormProps<T extends FieldValues = FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> {
    form: UseFormReturn<T>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    header: {
        title: string
        description?: string
    }
    footer: {
        description: string
        cta?: {
            label: string
            href: string
        }
        navigate?: {
            label: string
            href: string
        }
    }
    socialLogin?: ('google' | 'facebook' | 'x')[];
    children: React.ReactNode;
}