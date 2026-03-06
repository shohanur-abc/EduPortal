import 'server-only'

import { StudentModel } from "@/models/student"
import { connectDB, sid } from '@/lib/db'

export async function getOptions() {
    await connectDB()
    const students = await StudentModel.getOptions()

    return students.map((s) => ({
        _id: sid(s),
        name: String(s.name),
        rollNumber: String(s.rollNumber),
    }))
}
