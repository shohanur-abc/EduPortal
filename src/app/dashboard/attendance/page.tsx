import ROUTES from "@/lib/routes"
import { redirect } from "next/navigation"

export default function AttendancePage() {
    redirect(ROUTES.dashboard.overview)
}
