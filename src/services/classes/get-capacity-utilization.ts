"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getCapacityUtilization = cache(async () => {
    await db.connect()
    const raw = await db.class.capacityUtilization()
    return raw.map((r) => ({
        className: `${r.name} ${r.section}`,
        grade: r.grade as number,
        studentCount: r.studentCount as number,
        maxStudents: r.maxStudents as number,
        utilization: r.utilization as number,
    }))
})
