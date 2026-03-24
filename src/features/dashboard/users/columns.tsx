import { SortableHeader } from "@/components/molecules"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { UserActions } from "./user-actions"
import type { AnyUser, UserRole } from "./types"

const textCell = (value?: string) => <span className="text-sm text-muted-foreground">{value || "—"}</span>

const AvatarNameColumn = (title: string = "Name"): ColumnDef<AnyUser> => ({
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title={title} />,
    cell: ({ row }) => <AvatarCell name={row.original.name} secondary={row.original.email} />,
})

const IdColumn = (title: string): ColumnDef<AnyUser> => ({
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title={title} />,
    cell: ({ row }) => textCell(row.original.id),
})

const PhoneColumn = (title: string = "Phone"): ColumnDef<AnyUser> => ({
    accessorKey: "phone",
    header: ({ column }) => <SortableHeader column={column} title={title} />,
    cell: ({ row }) => textCell(row.original.phone),
})

const AddressColumn = (title: string = "Address"): ColumnDef<AnyUser> => ({
    accessorKey: "address",
    header: ({ column }) => <SortableHeader column={column} title={title} />,
    cell: ({ row }) => textCell(row.original.address),
})

const StatusColumn = (title: string = "Status"): ColumnDef<AnyUser> => ({
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title={title} />,
    cell: ({ row }) => {
        if (row.original.role === "admin" || row.original.role === "principal" || row.original.role === "parent") {
            return <Badge variant={row.original.status === "active" ? "default" : "secondary"}>{row.original.status}</Badge>
        }
        return textCell("—")
    },
})

const ActionColumn = (): ColumnDef<AnyUser> => ({
    id: "action",
    header: () => <span className="text-sm">Action</span>,
    cell: ({ row }) => <UserActions user={row.original} />,
    enableSorting: false,
    enableHiding: false,
})

const PermissionLevelColumn: ColumnDef<AnyUser> = {
    accessorKey: "permissionLevel",
    header: ({ column }) => <SortableHeader column={column} title="Permission" />,
    cell: ({ row }) => textCell(row.original.role === "admin" ? row.original.permissionLevel : "—"),
}

const SchoolNameColumn: ColumnDef<AnyUser> = {
    accessorKey: "schoolName",
    header: ({ column }) => <SortableHeader column={column} title="School" />,
    cell: ({ row }) => textCell(row.original.role === "principal" ? row.original.schoolName : "—"),
}

const JoinedDateColumn: ColumnDef<AnyUser> = {
    accessorKey: "joinedDate",
    header: ({ column }) => <SortableHeader column={column} title="Joined" />,
    cell: ({ row }) => textCell(row.original.role === "principal" || row.original.role === "teacher" ? row.original.joinedDate : "—"),
}

const SchoolIdColumn: ColumnDef<AnyUser> = {
    accessorKey: "schoolId",
    header: ({ column }) => <SortableHeader column={column} title="School ID" />,
    cell: ({ row }) => textCell(row.original.role === "teacher" ? row.original.schoolId : "—"),
}

const SubjectColumn: ColumnDef<AnyUser> = {
    accessorKey: "subject",
    header: ({ column }) => <SortableHeader column={column} title="Subject" />,
    cell: ({ row }) => textCell(row.original.role === "teacher" ? row.original.subject : "—"),
}

const ClassesColumn: ColumnDef<AnyUser> = {
    accessorKey: "classes",
    header: ({ column }) => <SortableHeader column={column} title="Classes" />,
    cell: ({ row }) => textCell(row.original.role === "teacher" ? row.original.classes.join(", ") : "—"),
}

const ClassColumn: ColumnDef<AnyUser> = {
    accessorKey: "class",
    header: ({ column }) => <SortableHeader column={column} title="Class" />,
    cell: ({ row }) => textCell(row.original.role === "student" ? row.original.class : "—"),
}

const DobColumn: ColumnDef<AnyUser> = {
    accessorKey: "dob",
    header: ({ column }) => <SortableHeader column={column} title="DOB" />,
    cell: ({ row }) => textCell(row.original.role === "student" ? row.original.dob : "—"),
}

const RelationColumn: ColumnDef<AnyUser> = {
    accessorKey: "relation",
    header: ({ column }) => <SortableHeader column={column} title="Relation" />,
    cell: ({ row }) => textCell(row.original.role === "parent" ? row.original.relation : "—"),
}

const ChildrenColumn: ColumnDef<AnyUser> = {
    accessorKey: "children",
    header: ({ column }) => <SortableHeader column={column} title="Children" />,
    cell: ({ row }) => textCell(row.original.role === "parent" ? row.original.children.join(", ") : "—"),
}

const ID_LABELS: Record<UserRole, string> = {
    admin: "Admin ID",
    principal: "Principal ID",
    teacher: "Teacher ID",
    student: "Student ID",
    parent: "Parent ID",
}

export const getColumnsByRole: Record<UserRole, ColumnDef<AnyUser>[]> = {
    admin: [
        // IdColumn(ID_LABELS.admin),
        AvatarNameColumn("Admin"),
        PhoneColumn(),
        AddressColumn(),
        PermissionLevelColumn,
        StatusColumn(),
        ActionColumn(),
    ],
    principal: [
        // IdColumn(ID_LABELS.principal),
        AvatarNameColumn("Principal"),
        PhoneColumn(),
        AddressColumn(),
        SchoolNameColumn,
        JoinedDateColumn,
        StatusColumn(),
        ActionColumn(),
    ],
    teacher: [
        // IdColumn(ID_LABELS.teacher),
        AvatarNameColumn("Teacher"),
        PhoneColumn(),
        AddressColumn(),
        // SchoolIdColumn,
        SubjectColumn,
        ClassesColumn,
        JoinedDateColumn,
        ActionColumn(),
    ],
    student: [
        // IdColumn(ID_LABELS.student),
        AvatarNameColumn("Student"),
        PhoneColumn(),
        AddressColumn(),
        ClassColumn,
        DobColumn,
        ActionColumn(),
    ],
    parent: [
        // IdColumn(ID_LABELS.parent),
        AvatarNameColumn("Parent"),
        PhoneColumn(),
        AddressColumn(),
        RelationColumn,
        ChildrenColumn,
        StatusColumn(),
        ActionColumn(),
    ],
}