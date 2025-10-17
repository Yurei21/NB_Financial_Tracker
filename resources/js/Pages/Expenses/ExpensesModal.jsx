import { useState } from 'react';
import { router, Link } from '@inertiajs/react';

export default function ExpensesModal({ expenses, filters }) {
    const [selectedDate, setSelectedDate] = useState(filters.date);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);

        router.get(route('expenses.index'), { date: newDate }, {
            preserveState: true,
            replace: true,
        });
    };

    const deleteExpenses = (expense, currentPage) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        console.log('Deleting expense:', expense.id);
        console.log('Selected date:', selectedDate);
        console.log('Current page:', currentPage);

        router.delete(route('expenses.destroy', expense.id), {
            data: {
                date: selectedDate,
                page: currentPage
            },
            preserveState: true,
            preserveScroll: true,
        });
    };


    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Expenses on {selectedDate}
                </h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border rounded-md px-3 py-1 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                />
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {expenses.data.length > 0 ? (
                    expenses.data.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 flex flex-wrap gap-4"
                        >
                            {[
                                ['Label', expense.label],
                                ['Description', expense.description],
                                ['Expenses Date', expense.expense_date],
                                ['Amount', `₱${expense.amount}`],
                                ['Created By', expense.created_by],
                                ['Modified By', expense.modified_by],
                            ].map(([label, value]) => (
                                <div key={label} className="flex-1 min-w-[150px]">
                                    <label className="block text-xs text-gray-500 dark:text-gray-400">{label}</label>
                                    <p className="text-gray-200 dark:text-gray-200 rounded-lg bg-gray-600 dark:bg-gray-600 p-2 truncate overflow-hidden whitespace-nowrap">
                                        {value}
                                    </p>
                                </div>

                            ))}
                            <div className="flex gap-2 mt-2 w-full">
                                <Link href={route('expenses.show', expense.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1">
                                    View all details
                                </Link>
                                <Link href={route('expenses.edit', expense.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1 rounded-lg border-solid">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteExpenses(expense, expenses.meta?.current_page)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No expenses for this date</p>
                )}
            </div>

            {expenses.data.length > 0 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        disabled={!expenses.links.prev}
                        onClick={() => router.get(expenses.links.prev, {}, { preserveState: true, replace: true })}
                        className={`px-3 py-1 rounded-md ${expenses.links.prev
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        Prev
                    </button>

                    {expenses.meta.last_page && Array.from({ length: expenses.meta.last_page }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() =>
                                router.get(route('expenses.index', { date: selectedDate, page }), {}, { preserveState: true, replace: true })
                            }
                            className={`px-3 py-1 rounded-md ${page === expenses.meta.current_page
                                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={!expenses.links.next}
                        onClick={() => router.get(expenses.links.next, {}, { preserveState: true, replace: true })}
                        className={`px-3 py-1 rounded-md ${expenses.links.next
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