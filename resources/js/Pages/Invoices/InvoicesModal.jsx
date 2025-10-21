import { Link } from '@inertiajs/react';

export default function InvoicesModal({ invoices, filters }) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    {invoices.data.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b dark:border-gray-700">
                                    <th className="text-left py-2">Transaction ID</th>
                                    <th className="text-left py-2">Order</th>
                                    <th className="text-left py-2">Amount</th>
                                    <th className="text-left py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.data.map((invoice) => (
                                    <tr key={invoice.id} className="border-b dark:border-gray-700">
                                        <td className="py-2">{invoice.transaction_id}</td>
                                        <td className="py-2">{invoice.order?.patient_name ?? 'N/A'}</td>
                                        <td className="py-2">₱{invoice.amount.toFixed(2)}</td>
                                        <td className="py-2">{invoice.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500">No invoices found for this date.</p>
                    )}

                    {invoices.meta?.links?.length > 3 && (
                        <div className="flex justify-center mt-4 space-x-1">
                            {invoices.meta.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    } ${!link.url && 'opacity-50 cursor-default'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
