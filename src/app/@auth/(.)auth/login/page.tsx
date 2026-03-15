import { loginData } from "@/app/auth/login/page";
import LoginDialog from "@/features/auth/sections/login";

export default function Page() {
    return (
        <LoginDialog {...loginData} />
    );
}
