import { SortableHeader } from "@/components/molecules";
import { AvatarCell } from "@/components/molecules/avatar-cell";
import { ColumnDef } from "@tanstack/react-table";

export const NumColumn: ColumnDef<{ id: string }> = {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.id}</span>,
}

export const NameColumn: ColumnDef<{ name: string }> = {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
}

export const DesignationColumn: ColumnDef<{ designation: string }> = {
    accessorKey: "designation",
    header: ({ column }) => <SortableHeader column={column} title="Designation" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.designation}</span>,
}

export const AttendanceColumn: ColumnDef<{ status: "present" | "absent" | "late" | "excused" }> = {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.status}</span>,
}

export const RemarksColumn: ColumnDef<{ remarks: string }> = {
    accessorKey: "remarks",
    header: ({ column }) => <SortableHeader column={column} title="Remarks" />,
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.remarks}</span>,
}

export const AvatarColumn: ColumnDef<{ name: string; secondary: string; status: "present" | "absent" | "late" | "excused"; remarks?: string }> = {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Staff Member" />,
    cell: ({ row }) => (
        <AvatarCell
            name={row.original.name}
            secondary={row.original.secondary}
            status={row.original.status}
            remarks={row.original.remarks}
        />
    ),
}
