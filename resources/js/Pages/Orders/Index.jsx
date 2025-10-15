import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import OrdersModal from './OrdersModal'
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function OrdersIndex({ orders, filters, success, totalAmount }) {
    const amount = totalAmount ?? 0
    const [showSuccess, setShowSuccess] = useState(!!success);

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Orders</h2>
                    <Link
                        href={route("orders.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        + Add New
                    </Link>
                </div>
            }
        >
            <Head title="Orders" />

            {showSuccess && success && (
                <div
                    className={`bg-emerald-500 px-4 py-2 text-white rounded mb-3 transition-all duration-500 ease-in-out ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                >
                    {success}
                </div>
            )}


            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row justify-between gap-4 mt-5">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {orders.meta?.total ?? orders.data.length}
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

            <OrdersModal orders={orders} filters={filters} />
        </AuthenticatedLayout>
    );
}
