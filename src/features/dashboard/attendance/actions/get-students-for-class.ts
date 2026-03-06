"use server"

import * as students from "@/services/students"

export async function getStudentsForClass(section: string) {
    return students.getForClass(section)
}
