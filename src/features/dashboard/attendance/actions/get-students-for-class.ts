"use server"

import { Student } from "@/services/student.service"

export async function getStudentsForClass(section: string) {
    return Student.getForClass(section)
}
