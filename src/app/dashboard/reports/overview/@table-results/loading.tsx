import { ResultReportTable } from "@/features/dashboard/reports/overview/@table-results"

export default function TableResultsLoading() {
    return <ResultReportTable data={[{ exam: "OOOOOO", subject: "OOOOOO", avgMarks: 333, count: 333 }]} loading={true} />
}
