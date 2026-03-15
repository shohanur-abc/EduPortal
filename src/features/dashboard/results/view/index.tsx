import { EmptyState } from "@/components/molecules/empty-state";
import { ClassOption, ResultRecord, StudentOption } from "../shared/types";
import { FileText } from "@/lib/icon";
import { ResultsCrudTable } from "../enter/result-crud";

export function ResultsView({ results, students, classes }: { results: ResultRecord[]; students: StudentOption[]; classes: ClassOption[] }) {
    if (results.length === 0) {
        return (
            <EmptyState
                title="No Results Found"
                description="There are no exam results recorded yet. Results will appear here once marks are entered."
                icon={FileText}
            />
        )
    }

    return <ResultsCrudTable results={results} students={students} classes={classes} />
}
