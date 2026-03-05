import { Result } from "@/services/result.service"
import { Student } from "@/services/student.service"
import { Class } from "@/services/class.service"
import { ResultsCrudTable } from "@/features/dashboard/results/enter/result-crud"

export default async function ResultsEnterTab() {
	const [results, students, classes] = await Promise.all([Result.getAll(), Student.getOptions(), Class.getOptions()])
	return <ResultsCrudTable results={results} students={students} classes={classes} />
}
