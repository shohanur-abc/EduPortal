import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { UserTable } from "@/features/dashboard/users/UserTable"
import type { UserRole } from "@/features/dashboard/users/types"
import { getRoleCounts, getTableData } from "@/services/users"
import { getAll as getAllClasses } from "@/services/classes"

export const metadata: Metadata = {
	title: "Users | Dashboard",
	description: "Role based users management table",
}

const VALID_ROLES: UserRole[] = ["admin", "principal", "teacher", "student", "parent"]

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		role?: UserRole
		search?: string
		page?: string
		pageSize?: string
		sort?: string
		order?: "asc" | "desc"
	}>
}) {
	const session = await auth()
	const sessionRole = VALID_ROLES.includes((session?.user?.role as UserRole) || "teacher")
		? (session?.user?.role as UserRole)
		: "teacher"

	const params = await searchParams
	const role = VALID_ROLES.includes((params.role as UserRole) || sessionRole)
		? (params.role as UserRole)
		: sessionRole
	const search = params.search || ""
	const page = Number(params.page || "1")
	const pageSize = Number(params.pageSize || "10")
	const sort = params.sort || "name"
	const order = params.order === "desc" ? "desc" : "asc"

	const [{ data, total, pageCount }, counts, classes] = await Promise.all([
		getTableData({ role, search, page, pageSize, sort, order }),
		getRoleCounts(),
		getAllClasses(),
	])

	const classOptions = classes.map((classItem) => ({
		value: classItem._id,
		label: `${classItem.name} (${classItem.section})`,
	}))

	const roleCounts = counts.reduce<Record<UserRole, number>>(
		(acc, item) => {
			const itemRole = item.role as UserRole
			if (VALID_ROLES.includes(itemRole)) acc[itemRole] = item.count
			return acc
		},
		{ admin: 0, principal: 0, teacher: 0, student: 0, parent: 0 }
	)
	return (
		<UserTable
			data={data}
			total={total}
			pageCount={pageCount}
			defaultRole={role}
			roleCounts={roleCounts}
			classOptions={classOptions}
		/>
	)
}
