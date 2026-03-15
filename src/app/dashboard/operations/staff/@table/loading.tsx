import { StaffTable } from "@/features/dashboard/operations/staff/teacher-crud";

export default function TableLoading() {
    return <StaffTable teachers={data} loading={true} />
}

const data = new Array(10).fill(0).map((_, i) => ({
    _id: `teacher-${i}`,
    name: "Dr. Abdur Rahman",
    email: "abdur.rahman@EduPortal .com",
    phone: "+8801711001001",
    subject: "Computer Science",
    department: "Science",
    qualification: "MSc Computer Science",
    status: "active",
    joinDate: "2020-01-15",
}))
