import { ResultsCrudTable } from "./result-crud";
import { ClassOption, ResultRecord, StudentOption } from "../shared/types";

// ============= ENTER SECTION =============
export function ResultsEnter({ results, students, classes }: { results: ResultRecord[]; students: StudentOption[]; classes: ClassOption[] }) {
    return <ResultsCrudTable results={results} students={students} classes={classes} />
}


