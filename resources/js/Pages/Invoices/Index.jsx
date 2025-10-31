import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InvoicesModal from './InvoicesModal';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

export default function InvoicesIndex({ invoices, filters, success, totalAmount }) {
    const amount = totalAmount ?? 0;
    const [showSuccess, setShowSuccess] = useState(!!success);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const filteredInvoices = useMemo(() => {
        if (!searchQuery.trim()) return invoices;
        const query = searchQuery.toLowerCase();

        return {
            ...invoices,
            data: invoices.data.filter(invoice =>
                (invoice.transaction_id && invoice.transaction_id.toLowerCase().includes(query)) ||
                (invoice.order.patient_name && invoice.order.patient_name.toLowerCase().includes(query)) ||
                (invoice.amount && invoice.amount.toFixed(2).includes(query)) ||
                (invoice.invoice_date && invoice.invoice_date.toLowerCase().includes(query))
            ),
        };
    }, [invoices, searchQuery]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Invoices
                    </h2>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search invoices..."
                        className="w-full sm:w-1/3 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                </div>
            }
        >
            <Head title="Invoices" />

            {showSuccess && success && (
                <div
                    className={`bg-emerald-500 px-4 py-2 text-white rounded mb-3 transition-all duration-500 ease-in-out ${
                        showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                >
                    {success}
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row justify-between gap-4 mt-5">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Invoices</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {invoices.meta?.total ?? invoices.data.length}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            ₱{amount.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {filters.date}
                        </p>
                    </div>
                </div>
            </div>

            <InvoicesModal invoices={filteredInvoices} filters={filters} />
        </AuthenticatedLayout>
    );
}
