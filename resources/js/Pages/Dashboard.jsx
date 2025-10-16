import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import useDarkMode from '@/Components/IsDark'

export default function Dashboard() {

    const isDark = useDarkMode();

    const textColor = isDark ? '#E5E7EB' : '#1F2937';
    const gridColor = isDark ? '#374151' : '#E5E7EB';
    const bgColor = isDark ? '#1F2937' : '#FFFFFF';

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const eData = [1000, 1200, 700, 1100, 1800, 1500, 2000];
    const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="max-w-6xl my-9 mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    August’s report
                                </h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400">August 2025</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Total Orders</p>
                                    <p className="text-2xl font-bold">₱10,000</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-yellow-600 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Total Expenses</p>
                                    <p className="text-2xl font-bold">₱2,000</p>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-lg py-4 shadow">
                                    <p className="text-sm font-medium">Net Income</p>
                                    <p className="text-2xl font-bold">₱8,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col items-center mx-8">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                    Expenses by Label
                                </h3>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 10, label: 'Month A' },
                                                { id: 1, value: 15, label: 'Month B' },
                                                { id: 2, value: 20, label: 'Month C' },
                                            ],
                                        },
                                    ]}
                                    width={250}
                                    height={250}
                                    sx={{
                                        backgroundColor: bgColor,
                                        '& .MuiChartsLabel-root': {
                                            fill: textColor,
                                        },
                                        '& .MuiChartsLegend-root': {
                                            color: textColor,
                                        },
                                    }}
                                />
                            </div>

                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 mx-8">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                    Revenue vs Expenses
                                </h3>
                                <Box sx={{ width: '100%', height: 300 }}>
                                    <LineChart
                                        series={[
                                            { data: uData, label: 'Revenue', color: '#2563eb', area: true, showMark: false },
                                            { data: eData, label: 'Expenses', color: '#dc2626', area: true, showMark: false },
                                        ]}
                                        xAxis={[
                                            {
                                                scaleType: 'point',
                                                data: xLabels,
                                                tickLabelStyle: { fill: textColor },
                                            },
                                        ]}
                                        yAxis={[
                                            {
                                                tickLabelStyle: { fill: textColor },
                                            },
                                        ]}
                                        sx={{
                                            [`& .MuiChartsAxis-line`]: { stroke: gridColor },
                                            [`& .MuiChartsGrid-line`]: { stroke: gridColor },

                                            [`& .MuiChartsTooltip-root`]: {
                                                backgroundColor: bgColor,
                                                color: textColor,
                                            },

                                            [`& .MuiChartsLegend-root`]: {
                                                color: textColor,
                                            },
                                            [`& .MuiChartsLegend-series text`]: {
                                                fill: textColor,
                                            },
                                        }}
                                    />
                                </Box>

                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-4 mt-8 mx-6 mb-10">
                            <Link
                                href={route('orders.create')}
                                className="flex-1 min-w-[200px] text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg shadow transition duration-150"
                            >
                                Generate Orders
                            </Link>

                            <Link
                                href={route('dashboard')}
                                className="flex-1 min-w-[200px] text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-lg shadow transition duration-150"
                            >
                                View Recent Reports
                            </Link>

                            <Link
                                href={route('expenses.create')}
                                className="flex-1 min-w-[200px] text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-lg shadow transition duration-150"
                            >
                                Generate Expenses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
