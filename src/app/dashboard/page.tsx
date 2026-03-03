import { redirect } from "next/navigation";

export default function ReadirectToOverview() {
	redirect("/dashboard/overview")
}