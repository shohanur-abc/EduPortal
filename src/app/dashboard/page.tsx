export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">Attendance Rate</p>
          <p className="text-3xl font-bold">94.2%</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">Fees Collected</p>
          <p className="text-3xl font-bold">$45,321</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground">Pending Approvals</p>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
