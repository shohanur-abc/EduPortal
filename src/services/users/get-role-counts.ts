import { cache } from 'react'
import { UserModel } from "@/models/user"
import { connectDB } from '@/lib/db'

export const getRoleCounts = cache(async () => {
    await connectDB()
    const counts = await UserModel.roleCounts()

    return counts.map((r) => ({
        role: r._id as string,
        count: r.count as number,
    }))
})
