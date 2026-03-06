import * as resultsSvc from "@/services/results"
import * as students from "@/services/students"
import * as classes from "@/services/classes"
import { ResultsCrudTable } from "@/features/dashboard/results/enter/result-crud"

export default async function ResultsEnterTab() {
	const [results, studentOptions, classOptions] = await Promise.all([resultsSvc.getAll(), students.getOptions(), classes.getOptions()])
	return <ResultsCrudTable results={results} students={studentOptions} classes={classOptions} />
}
