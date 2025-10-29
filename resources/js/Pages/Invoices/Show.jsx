import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function Show({ invoice }) {
    console.log(invoice)

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Invoice Details</h2>}
        >
            <Head title={`Invoice #${invoice.id}`} />

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 animate-fadeIn">
                <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-100 hover:scale-[1.02]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => window.history.back()}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>

                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Invoice #{invoice.id}
                    </h2>

                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p><strong>Transaction ID:</strong> {invoice.transaction_id}</p>

                        <p>
                            <strong>Order:</strong>{" "}
                            <Link
                                href={route('orders.show', invoice.order_id)}
                                className="text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                                {invoice.order?.patient_name ?? 'N/A'}
                            </Link>
                        </p>

                        <p><strong>Total Amount:</strong> ₱{parseFloat(invoice.amount).toFixed(2)}</p>
                        <p><strong>Description:</strong> {invoice.description ?? "—"}</p>
                        <p><strong>Created at:</strong> {invoice.date}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}