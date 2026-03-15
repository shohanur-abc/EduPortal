"use client"

import { Chart, ChartWithSelector } from "./com"

// Sample data for various charts
const revenueData = [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 2000, expenses: 9800 },
    { month: "Apr", revenue: 2780, expenses: 3908 },
    { month: "May", revenue: 1890, expenses: 4800 },
    { month: "Jun", revenue: 2390, expenses: 3800 },
]

const performanceData = [
    { subject: "Math", value: 95 },
    { subject: "Science", value: 88 },
    { subject: "English", value: 92 },
    { subject: "History", value: 78 },
    { subject: "Physical Education", value: 85 },
]

const distributionData = [
    { category: "A", value: 400 },
    { category: "B", value: 300 },
    { category: "C", value: 200 },
    { category: "D", value: 100 },
]

const scatterData = [
    { study_hours: 3, score: 45 },
    { study_hours: 5, score: 72 },
    { study_hours: 2, score: 28 },
    { study_hours: 7, score: 88 },
    { study_hours: 4, score: 60 },
]

export default function Page() {
    return (
        <div className="w-full min-h-screen bg-linear-to-b from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Reusable Chart Component
                    </h1>
                    <p className="text-lg text-slate-600">
                        Multi-type chart component with consistent data structure
                    </p>
                </div>

                {/* Interactive Chart with Type Selector */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Interactive Chart Switcher
                        </h2>
                        <p className="text-sm text-slate-600">
                            Switch between different chart types on the fly
                        </p>
                    </div>
                    <ChartWithSelector
                        data={chartData}
                        series={[
                            { key: "desktop", label: "Revenue", color: "#2563eb" },
                            { key: "mobile", label: "Expenses", color: "#dc2626" },
                        ]}
                        xAxisKey="month"
                        height={20}
                        showGrid
                        showLegend
                        showTooltip
                        defaultType="line"
                    />
                </div>

                {/* Line Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Line Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Shows trends over time with multiple series
                        </p>
                    </div>
                    <Chart
                        data={revenueData}
                        series={[
                            { key: "revenue", label: "Revenue", color: "#2563eb" },
                            { key: "expenses", label: "Expenses", color: "#dc2626" },
                        ]}
                        type="line"
                        xAxisKey="month"
                        height={300}
                        showGrid
                        showLegend
                        showTooltip
                    />
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Bar Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Compares values across categories
                        </p>
                    </div>
                    <Chart
                        data={revenueData}
                        series={[
                            { key: "revenue", label: "Revenue", color: "#16a34a" },
                            { key: "expenses", label: "Expenses", color: "#ea580c" },
                        ]}
                        type="bar"
                        xAxisKey="month"
                        height={300}
                        showGrid
                        showLegend
                        showTooltip
                    />
                </div>

                {/* Area Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Area Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Visualizes cumulative values with stacking
                        </p>
                    </div>
                    <Chart
                        data={revenueData}
                        series={[
                            { key: "revenue", label: "Revenue", color: "#7c3aed" },
                            { key: "expenses", label: "Expenses", color: "#0891b2" },
                        ]}
                        type="area"
                        xAxisKey="month"
                        height={300}
                        showGrid
                        showLegend
                        showTooltip
                        stacked
                    />
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Pie Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Shows proportional distribution
                        </p>
                    </div>
                    <Chart
                        data={distributionData}
                        series={[
                            { key: "value", label: "Distribution", color: "#db2777" },
                        ]}
                        type="pie"
                        xAxisKey="category"
                        height={350}
                        showLegend
                        showTooltip
                    />
                </div>

                {/* Radar Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Radar Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Multi-dimensional comparison
                        </p>
                    </div>
                    <Chart
                        data={performanceData}
                        series={[
                            { key: "value", label: "Score", color: "#65a30d" },
                        ]}
                        type="radar"
                        xAxisKey="subject"
                        height={350}
                        showLegend
                        showTooltip
                    />
                </div>

                {/* Scatter Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Scatter Chart
                        </h2>
                        <p className="text-sm text-slate-600">
                            Shows relationship between two variables
                        </p>
                    </div>
                    <Chart
                        data={scatterData}
                        series={[
                            { key: "score", label: "Test Score", color: "#f59e0b" },
                        ]}
                        type="scatter"
                        xAxisKey="study_hours"
                        height={300}
                        showGrid
                        showLegend
                        showTooltip
                    />
                </div>

                {/* Code Example */}
                <div className="bg-slate-900 rounded-lg shadow-lg p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Usage Example</h2>
                    <pre className="bg-slate-950 text-slate-100 p-4 rounded overflow-x-auto text-sm">
                        {`import { Chart } from './com'

const data = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
]

export default function MyChart() {
  return (
    <Chart
      data={data}
      series={[
        { key: "revenue", label: "Revenue" },
        { key: "expenses", label: "Expenses" },
      ]}
      type="line"
      xAxisKey="month"
      stacked={false}
      showGrid
      showLegend
      showTooltip
    />
  )
}`}
                    </pre>
                </div>

                {/* Feature List */}
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">Chart Types</h3>
                            <ul className="text-sm text-slate-600 space-y-1">
                                <li>✓ Line Chart</li>
                                <li>✓ Bar Chart</li>
                                <li>✓ Area Chart</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">More Types</h3>
                            <ul className="text-sm text-slate-600 space-y-1">
                                <li>✓ Pie Chart</li>
                                <li>✓ Radar Chart</li>
                                <li>✓ Scatter Chart</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">Customization</h3>
                            <ul className="text-sm text-slate-600 space-y-1">
                                <li>✓ Custom Colors</li>
                                <li>✓ Grid Toggle</li>
                                <li>✓ Legend Toggle</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">Advanced Options</h3>
                            <ul className="text-sm text-slate-600 space-y-1">
                                <li>✓ Stacked Charts</li>
                                <li>✓ Consistent Data Structure</li>
                                <li>✓ Type-Safe Props</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
    { date: "2024-05-02", desktop: 293, mobile: 310 },
    { date: "2024-05-03", desktop: 247, mobile: 190 },
    { date: "2024-05-04", desktop: 385, mobile: 420 },
    { date: "2024-05-05", desktop: 481, mobile: 390 },
    { date: "2024-05-06", desktop: 498, mobile: 520 },
    { date: "2024-05-07", desktop: 388, mobile: 300 },
    { date: "2024-05-08", desktop: 149, mobile: 210 },
    { date: "2024-05-09", desktop: 227, mobile: 180 },
    { date: "2024-05-10", desktop: 293, mobile: 330 },
    { date: "2024-05-11", desktop: 335, mobile: 270 },
    { date: "2024-05-12", desktop: 197, mobile: 240 },
    { date: "2024-05-13", desktop: 197, mobile: 160 },
    { date: "2024-05-14", desktop: 448, mobile: 490 },
    { date: "2024-05-15", desktop: 473, mobile: 380 },
    { date: "2024-05-16", desktop: 338, mobile: 400 },
    { date: "2024-05-17", desktop: 499, mobile: 420 },
    { date: "2024-05-18", desktop: 315, mobile: 350 },
    { date: "2024-05-19", desktop: 235, mobile: 180 },
    { date: "2024-05-20", desktop: 177, mobile: 230 },
    { date: "2024-05-21", desktop: 82, mobile: 140 },
    { date: "2024-05-22", desktop: 81, mobile: 120 },
    { date: "2024-05-23", desktop: 252, mobile: 290 },
    { date: "2024-05-24", desktop: 294, mobile: 220 },
    { date: "2024-05-25", desktop: 201, mobile: 250 },
    { date: "2024-05-26", desktop: 213, mobile: 170 },
    { date: "2024-05-27", desktop: 420, mobile: 460 },
    { date: "2024-05-28", desktop: 233, mobile: 190 },
    { date: "2024-05-29", desktop: 78, mobile: 130 },
    { date: "2024-05-30", desktop: 340, mobile: 280 },
    { date: "2024-05-31", desktop: 178, mobile: 230 },
    { date: "2024-06-01", desktop: 178, mobile: 200 },
    { date: "2024-06-02", desktop: 470, mobile: 410 },
    { date: "2024-06-03", desktop: 103, mobile: 160 },
    { date: "2024-06-04", desktop: 439, mobile: 380 },
    { date: "2024-06-05", desktop: 88, mobile: 140 },
    { date: "2024-06-06", desktop: 294, mobile: 250 },
    { date: "2024-06-07", desktop: 323, mobile: 370 },
    { date: "2024-06-08", desktop: 385, mobile: 320 },
    { date: "2024-06-09", desktop: 438, mobile: 480 },
    { date: "2024-06-10", desktop: 155, mobile: 200 },
    { date: "2024-06-11", desktop: 92, mobile: 150 },
    { date: "2024-06-12", desktop: 492, mobile: 420 },
    { date: "2024-06-13", desktop: 81, mobile: 130 },
    { date: "2024-06-14", desktop: 426, mobile: 380 },
    { date: "2024-06-15", desktop: 307, mobile: 350 },
    { date: "2024-06-16", desktop: 371, mobile: 310 },
    { date: "2024-06-17", desktop: 475, mobile: 520 },
    { date: "2024-06-18", desktop: 107, mobile: 170 },
    { date: "2024-06-19", desktop: 341, mobile: 290 },
    { date: "2024-06-20", desktop: 408, mobile: 450 },
    { date: "2024-06-21", desktop: 169, mobile: 210 },
    { date: "2024-06-22", desktop: 317, mobile: 270 },
    { date: "2024-06-23", desktop: 480, mobile: 530 },
    { date: "2024-06-24", desktop: 132, mobile: 180 },
    { date: "2024-06-25", desktop: 141, mobile: 190 },
    { date: "2024-06-26", desktop: 434, mobile: 380 },
    { date: "2024-06-27", desktop: 448, mobile: 490 },
    { date: "2024-06-28", desktop: 149, mobile: 200 },
    { date: "2024-06-29", desktop: 103, mobile: 160 },
    { date: "2024-06-30", desktop: 446, mobile: 400 },
]
