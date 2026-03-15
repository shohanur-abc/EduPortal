"use server"

import { db } from '@/fatman'
import { sid } from '@/fatman/utils'

export async function getOptions() {
    await db.connect()
    const classes = await db.class
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
