import { OperationsGenderChart } from "@/features/dashboard/operations/overview/@chart-gender"
export default function Loading() {
    return <OperationsGenderChart data={[{ gender: "male", count: 0 }, { gender: "female", count: 0 }]} />
}
