import { redirect } from "next/navigation"
import ROUTES from "@/lib/routes"

export default function FeesPage() {
  redirect(ROUTES.dashboard.fees.overview)
}
