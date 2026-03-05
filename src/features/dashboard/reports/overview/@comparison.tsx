import { ComparisonBar } from "@/components/molecules/comparison-bar"

export function ReportComparison({ attendanceCount, feeCount, resultCount }: {
    attendanceCount: number
    feeCount: number
    resultCount: number
}) {
    const total = attendanceCount + feeCount + resultCount

    return (
        <ComparisonBar
            title="Report Data Distribution"
            description="Data volume across report categories"
            items={[
                { label: "Attendance", value: attendanceCount, percentage: total > 0 ? Math.round((attendanceCount / total) * 100) : 0 },
                { label: "Fees", value: feeCount, percentage: total > 0 ? Math.round((feeCount / total) * 100) : 0 },
                { label: "Results", value: resultCount, percentage: total > 0 ? Math.round((resultCount / total) * 100) : 0 },
            ]}
        />
    )
}
