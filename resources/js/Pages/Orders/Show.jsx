import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ order, filters }) {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit(route('orders.index'));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Order: ${order.patient_name}`} />

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 animate-fadeIn">
                <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 relative transform transition-all duration-300 scale-100 hover:scale-[1.01]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={goBack}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>

                    <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                        Order Details
                    </h1>

                    <div className="space-y-5">
                        <div>
                            <InputLabel htmlFor="patient_name" value="Patient Name" />
                            <TextInput
                                id="patient_name"
                                type="text"
                                value={order.patient_name}
                                readOnly
                                className="mt-1 block w-full cursor-default"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="order_date" value="Order Date" />
                            <TextInput
                                id="order_date"
                                type="text"
                                value={order.order_date}
                                readOnly
                                className="mt-1 block w-full cursor-default"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="amount" value="Amount" />
                            <TextInput
                                id="amount"
                                type="text"
                                value={`₱${parseFloat(order.amount).toLocaleString()}`}
                                readOnly
                                className="mt-1 block w-full cursor-default text-green-600 dark:text-green-400 font-semibold"
                            />
                        </div>

                        {order.description && (
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <TextInput
                                    id="description"
                                    type="text"
                                    value={order.description}
                                    readOnly
                                    className="mt-1 block w-full cursor-default"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-8">
                        <PrimaryButton
                            onClick={goBack}
                            className="bg-blue-800 text-gray-50 hover:bg-blue-900 transition-all"
                        >
                            Back
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}