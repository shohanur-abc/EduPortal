import { Button } from "@/components/molecules";
import { ROUTES } from "@/lib/routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ISignupWizard } from "../signup-wizard";

export const WelcomePanel = ({ config, onStart }: { config: ISignupWizard["config"]["welcome"]; onStart: () => void }) => (
    <div className="w-full max-w-md flex flex-col gap-8">
        <div className="space-y-3 lg:hidden">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Get started</p>
            <h1 className="text-3xl font-bold tracking-tight">{config.title}</h1>
            <p className="text-muted-foreground">{config.description}</p>
        </div>
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
                Ready to join? It only takes a few minutes.
            </p>
            <Button size="lg" className="w-full gap-2" onClick={onStart} rightIcon={<ArrowRight className="size-4" />}>
Get Started
</Button>
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={ROUTES.auth.login} className="text-primary hover:underline font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    </div>
);