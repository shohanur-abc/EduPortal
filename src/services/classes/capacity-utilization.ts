import { cache } from 'react'
import { ClassModel } from "@/models/class"
import { connectDB } from '@/lib/db'

export const capacityUtilization = cache(async () => {
    await connectDB()
    const raw = await ClassModel.capacityUtilization()
    return raw.map((r) => ({
        className: `${r.name} ${r.section}`,
        grade: r.grade as number,
        studentCount: r.studentCount as number,
        maxStudents: r.maxStudents as number,
        utilization: r.utilization as number,
    }))
})
