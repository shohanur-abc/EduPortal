import { NoticeSummary } from "@/features/dashboard/notices/overview/@summary"
export default function Loading() {
    return <NoticeSummary total={33} published={33} drafts={33} urgent={3} loading={true} />
}
