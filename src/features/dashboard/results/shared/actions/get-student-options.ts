import { connectDB, sid } from "@/lib/db"
import { StudentModel } from "@/models/student"

export async function getStudentOptions() {
    await connectDB()

    const students = await StudentModel
        .find({ status: "active" })
        .select("name rollNumber")
        .sort({ name: 1 })
        .lean()

    return students.map((s) => ({
        _id: sid(s),
        name: s.name,
        rollNumber: s.rollNumber
    }))
}