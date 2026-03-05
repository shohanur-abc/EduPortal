import { FeeReportTable } from "@/features/dashboard/reports/overview/@table-fees"

export default function TableFeesLoading() {
    return <FeeReportTable data={[{ status: "OOO", total: 55555, collected: 55555, count: 333 }]} loading={true} />
}
