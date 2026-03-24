import { redirect } from "next/navigation";

export default async function ReadirectToOverview() {
	redirect("/dashboard/overview")
}