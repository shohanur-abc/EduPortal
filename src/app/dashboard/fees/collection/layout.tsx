export default function FeesCollectionLayout({ barchart, stats, table }: { barchart: React.ReactNode; stats: React.ReactNode; table: React.ReactNode }) {
    return (
        <>
            <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-4 space-y-4">
                <div className="col-span-7">{barchart}</div>
                <div className="col-span-5 grid grid-cols-2 gap-4">{stats}</div>
                <div className="col-span-full">{table}</div>
            </div>
        </>
    )
}