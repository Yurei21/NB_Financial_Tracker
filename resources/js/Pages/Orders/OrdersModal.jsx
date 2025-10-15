import { useState } from 'react';
import { router, Link } from '@inertiajs/react';

export default function OrdersCard({ orders, filters }) {
    const [selectedDate, setSelectedDate] = useState(filters.date);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);

        router.get(route('orders.index'), { date: newDate }, {
            preserveState: true,
            replace: true,
        });
    };

    const deleteOrder = (order, currentPage) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        router.delete(route('orders.destroy', order.id), {
            preserveState: true,
            preserveScroll: true,
            data: {
                date: selectedDate,
                page: currentPage
            }
        });
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Orders on {selectedDate}
                </h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border rounded-md px-3 py-1 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                />
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {orders.data.length > 0 ? (
                    orders.data.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 flex flex-wrap gap-4"
                        >
                            {[
                                ['Patient Name', order.patient_name],
                                ['Description', order.description],
                                ['Order Date', order.order_date],
                                ['Amount', `₱${order.amount}`],
                                ['Created By', order.created_by],
                                ['Modified By', order.modified_by],
                            ].map(([label, value]) => (
                                <div key={label} className="flex-1 min-w-[150px]">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400">{label}</label>
                                    <p className="text-gray-200 dark:text-gray-200 rounded-lg bg-gray-600 dark:bg-gray-600 p-2 truncate overflow-hidden whitespace-nowrap">
                                        {value}
                                    </p>
                                </div>

                            ))}
                            <div className="flex gap-2 mt-2 w-full">
                                <Link href={route('orders.show', order.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1">
                                    View all details
                                </Link>
                                <Link href={route('orders.edit', order.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1 rounded-lg border-solid">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteOrder(order, orders.meta?.current_page)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders for this date</p>
                )}
            </div>

            {orders.data.length > 0 && (
                <div className="flex justify-between mt-4">
                    <button
                        disabled={!orders.links.prev}
                        onClick={() => router.get(orders.links.prev, {}, { preserveState: true, replace: true })}
                        className={`px-3 py-1 rounded-md ${orders.links.prev
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        Prev
                    </button>

                    <button
                        disabled={!orders.links.next}
                        onClick={() => router.get(orders.links.next, {}, { preserveState: true, replace: true })}
                        className={`px-3 py-1 rounded-md ${orders.links.next
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
}