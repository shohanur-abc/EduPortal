import { RecentNotices } from "@/features/dashboard/overview/@table";
import { Notice } from "@/services";

export default async function Table() {
    const notices = await Notice.getRecent(10)
    return <RecentNotices notices={notices} />
}