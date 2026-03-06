import 'server-only'

import { ClassModel } from "@/models/class"
import { connectDB, sid } from '@/lib/db'

export async function getOptions() {
    await connectDB()
    const classes = await ClassModel
        .find({ status: "active" })
        .select("name section")
        .sort({ grade: 1, section: 1 })
        .lean()

    return classes.map((c) => ({
        _id: sid(c),
        name: c.name,
        section: c.section,
    }))
}
