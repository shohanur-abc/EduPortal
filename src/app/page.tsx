import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page(){
    return (
      <div className="h-screen flex justify-center items-center">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    )
}