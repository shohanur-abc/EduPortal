import { Result, Student, Class } from "@/services"
import { ResultsCrudTable } from "@/features/dashboard/results/enter/result-crud"

export default async function ResultsEnterTab() {
	const [results, studentOptions, classOptions] = await Promise.all([Result.getAll(), Student.getOptions(), Class.getOptions()])
	return <ResultsCrudTable results={results} students={studentOptions} classes={classOptions} />
}
