"use server"

import { Student } from "@/services"

export async function getStudentsForClass(section: string) {
    return Student.getForClass(section)
}
