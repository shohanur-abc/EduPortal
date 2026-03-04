import { ResultsCrudTable } from "@/features/dashboard/results/enter/result-crud"

export default async function ResultsEnterTab() {
    return <ResultsCrudTable results={results} students={students} classes={classes} loading={true} />
}

const results = new Array(10).fill(0).map((_, i) => ({
    _id: `result-${i + 1}`,
    studentName: `Jubayer Jahan`,
    rollNumber: ` STU-2025-052`,
    className: `Class ${((i % 5) + 1)}`,
    exam: `Exam ${((i % 3) + 1)}`,
    subject: ["Math", "Science", "English", "History", "Geography"][i % 5],
    marks: Math.floor(Math.random() * 100),
    totalMarks: 100,
    grade: ["A+", "A", "B+", "B", "C", "D"][Math.floor(Math.random() * 6)],
}))

const students = results.map(r => ({ _id: r._id, name: r.studentName, rollNumber: r.rollNumber }))
const classes = Array.from(new Set(results.map(r => r.className))).map(c => ({ _id: c, name: c, section: "" }))