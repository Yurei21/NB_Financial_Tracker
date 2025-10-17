import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ReportsIndex({ reports = [] }) {
    const [month, setMonth] = useState('August');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Reports
                    </h2>
                </div>
            }
        >
            <Head title="Reports" />

            <div className="py-6">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Month Selector */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-1">
                                    Month:
                                </label>
                                <select
                                    value={month}
                                    onChange={e => setMonth(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                >
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select>
                            </div>

                            {/* Summary Cards */}
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-blue-500 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Total Orders:</p>
                                    <p className="font-semibold text-lg">200</p>
                                </div>
                                <div className="bg-yellow-400 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Total Expenses:</p>
                                    <p className="font-semibold text-lg">₱50,000</p>
                                </div>
                                <div className="bg-teal-500 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Total Income:</p>
                                    <p className="font-semibold text-lg">₱100,000</p>
                                </div>
                                <div className="bg-green-600 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Net Profit:</p>
                                    <p className="font-semibold text-lg">₱50,000</p>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold dark:text-gray-100">Total Report</h3>
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                                >
                                    Print Monthly Report
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Day</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total Order</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total Income</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total Expenses</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Net Profit</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {reports.length > 0 ? (
                                            reports.map((r, i) => (
                                                <tr key={i} className="bg-white dark:bg-gray-800">
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{r.date}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{r.day}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{r.total_order}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">₱{r.total_income}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">₱{r.total_expenses}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">₱{r.net_profit}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                                        <button className="text-indigo-600 hover:underline">View</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                                    No records found.
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
