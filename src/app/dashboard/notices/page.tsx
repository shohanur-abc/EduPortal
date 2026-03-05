import { redirect } from "next/navigation"
import ROUTES from "@/lib/routes"

export default function NoticesPage() {
  redirect(ROUTES.dashboard.notices.overview)
}
