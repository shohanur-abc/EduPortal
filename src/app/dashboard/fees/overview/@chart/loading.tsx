import { FeeStatusBarChart } from "@/features/dashboard/fees/overview/@chart"

export default function ChartLoading() {
    return <FeeStatusBarChart data={data} />
}

const data = new Array(4).fill(0).map(() => ({
    status: '',
    count: 0,
}))