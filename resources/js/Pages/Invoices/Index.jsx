import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function InvoicesIndex({ invoices = [] }) {
    const [selectedDate, setSelectedDate] = useState('2025-08-23');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Invoices
                    </h2>
                </div>
            }
        >
            <Head title="Invoices" />

            <div className="py-6">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Top Summary */}
                        <div className="flex flex-wrap justify-between gap-4 mb-6">
                            {/* Date Picker */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-1">
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                />
                            </div>

                            {/* Summary Cards */}
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-blue-500 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Total Invoices:</p>
                                    <p className="font-semibold text-lg">10</p>
                                </div>
                                <div className="bg-yellow-400 text-white px-4 py-3 rounded-lg w-40 text-center shadow">
                                    <p className="text-sm">Total Amount:</p>
                                    <p className="font-semibold text-lg">₱10,000</p>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div>
                            <h3 className="text-lg font-semibold dark:text-gray-100 mb-3">List of Invoices</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">No.</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created by</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Edited by</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {invoices.length > 0 ? (
                                            invoices.map((invoice, index) => (
                                                <tr key={index} className="bg-white dark:bg-gray-800">
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{index + 1}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.order_id}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.transaction_id}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.date}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">₱{invoice.amount}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.created_by}</td>
                                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{invoice.edited_by || '-'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-gray-500 dark:text-gray-400 py-4">
                                                    No invoices found for this date.
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
