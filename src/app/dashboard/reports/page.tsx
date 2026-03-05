import { redirect } from "next/navigation"
import ROUTES from "@/lib/routes"

export default function ReportsPage() {
  redirect(ROUTES.dashboard.reports.overview)
}
