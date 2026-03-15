import { Checkbox, FormCheckbox, FormSelect } from "@/components/molecules";
import { Email, Password } from "@/components/molecules";
import { Select } from "@/components/molecules";
import Link from "next/link";
import { ISignupWizard } from "../signup-wizard";
import { Label } from "@/components/ui/label";

export const AccountPanel = ({ config }: { config: ISignupWizard["config"]["account"] }) => (
    <div className="w-full max-w-sm space-y-5">
        <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight">{config.title}</h2>
            <p className="text-muted-foreground text-sm">{config.description}</p>
        </div>
        <div className="space-y-4">
            <Email name="email" label="Email address" placeholder="you@example.com" classNames={{ label: 'sr-only' }} />
            <Password name="password" label="Password" classNames={{ label: 'sr-only' }} />
            <Password name="confirmPassword" label="Confirm Password" placeholder="Re-enter your password" classNames={{ label: 'sr-only' }} />
            <div className="flex *:w-fit gap-2">
                <Label htmlFor="role" className="text-sm whitespace-nowrap">I am a</Label>
                <FormSelect
                    name="role"
                    id="role"
                    placeholder="Select your role"
                    options={[
                        { label: "Student", value: "student" },
                        { label: "Teacher", value: "teacher" },
                        { label: "Parent", value: "parent" },
                        { label: "Principal", value: "principal" },
                        { label: "Admin", value: "admin" },
                    ]}
                />
            </div>
            <FormCheckbox
                name="acceptTerms"
                label={
                    <span className="[&>a]:text-primary [&>a]:hover:underline text-sm">
                        I agree to the{" "}
                        <Link href={config.termsHref}>Terms of Service</Link> and{" "}
                        <Link href={config.privacyHref}>Privacy Policy</Link>
                    </span>
                }
            />
        </div>
    </div>
);

