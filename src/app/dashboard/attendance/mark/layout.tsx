export default function MarkLayout({ mark, new: New }: { mark: React.ReactNode, new: React.ReactNode }) {
    return (
        <div>
            {New}
            {mark}
        </div>
    )
}