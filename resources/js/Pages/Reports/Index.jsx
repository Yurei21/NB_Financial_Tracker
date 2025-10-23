import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function ReportsIndex({ report, selectedMonth, selectedYear, availableYears }) {
    const [month, setMonth] = useState(selectedMonth);
    const [year, setYear] = useState(selectedYear);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        router.get(route('reports.index'), { month, year }, { preserveScroll: true, preserveState: true });
    }, [month, year]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100 leading-tight">
                        Reports
                    </h2>
                </div>
            }
        >
            <Head title="Reports" />

            <div className="py-8">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-900 shadow-lg sm:rounded-2xl p-8 border border-gray-200 dark:border-gray-700">

                        {/* Filters + Summary Cards */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                            <div className="flex flex-wrap gap-6">
                                {/* Month Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Month
                                    </label>
                                    <select
                                        value={month}
                                        onChange={e => setMonth(Number(e.target.value))}
                                        className="w-40 rounded-lg border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {monthNames.map((m, i) => (
                                            <option key={i} value={i + 1}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Year
                                    </label>
                                    <select
                                        value={year}
                                        onChange={e => setYear(Number(e.target.value))}
                                        className="w-28 rounded-lg border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {availableYears.length > 0 ? (
                                            availableYears.map((y, i) => (
                                                <option key={i} value={y}>{y}</option>
                                            ))
                                        ) : (
                                            <option>{new Date().getFullYear()}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                                <SummaryCard label="Total Orders" value={report?.total_orders ?? 0} color="blue" />
                                <SummaryCard label="Total Income" value={`₱${report?.total_income ?? '0.00'}`} color="teal" />
                                <SummaryCard label="Total Expenses" value={`₱${report?.total_expenses ?? '0.00'}`} color="yellow" />
                                <SummaryCard label="Net Profit" value={`₱${report?.net_profit ?? '0.00'}`} color="green" />
                            </div>
                        </div>

                        {/* Daily Breakdown */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Daily Breakdown
                                </h3>
                                <button
                                    onClick={() => window.print()}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow transition"
                                >
                                    Print Monthly Report
                                </button>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800/70">
                                        <tr>
                                            {['Date', 'Day', 'Total Order', 'Total Income', 'Total Expenses', 'Net Profit'].map((header, i) => (
                                                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {report && report.daily_data.length > 0 ? (
                                            report.daily_data.map((day, i) => (
                                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{day.date}</td>
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{day.day}</td>
                                                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{day.total_order}</td>
                                                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">₱{day.total_income}</td>
                                                    <td className="px-4 py-3 text-red-600 dark:text-red-400 font-medium">₱{day.total_expenses}</td>
                                                    <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 font-medium">₱{day.net_profit}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
                                                    No records found for this month.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function SummaryCard({ label, value, color }) {
    const colorMap = {
        blue: 'bg-blue-500',
        yellow: 'bg-yellow-400',
        teal: 'bg-teal-500',
        green: 'bg-green-600'
    };

    return (
        <div className={`${colorMap[color]} text-white px-5 py-4 rounded-xl text-center shadow-md`}>
            <p className="text-sm opacity-90">{label}</p>
            <p className="font-bold text-lg mt-1">{value}</p>
        </div>
    );
}
