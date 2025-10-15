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
        <AuthenticatedLayout >
            <Head title={`"Order"${order.patient_name}`}/>
            <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Order Details
                    </h1>
                </div>

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
                    <PrimaryButton onClick={goBack} className='bg-blue-800 text-gray-50'>
                        Back
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
