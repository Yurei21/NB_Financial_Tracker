import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import OrdersModal from './OrdersModal'
import { Head, Link } from '@inertiajs/react';

export default function OrdersIndex({ orders, filters }) {
    const totalAmount = orders.data.reduce((sum, order) => sum + parseFloat(order.amount), 0)
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Orders</h2>
                    <Link
                        href={route("orders.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"                
                    >Add New</Link>
                </div>
            }
        >
            <Head title='Orders'/>
            
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row justify-between gap-4 mt-5">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{orders.meta?.total ?? orders.data.length}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">₱{totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{filters.date}</p>
                    </div>
                </div>
            </div>

            <OrdersModal orders={orders} filters={filters} />
        </AuthenticatedLayout>
    );
}
