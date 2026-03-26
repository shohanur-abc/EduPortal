"use server"

import { Student } from "@/services"

export async function getStudentsForClass(classId: string, section: string) {
    return Student.getForClass(classId, section)
}
