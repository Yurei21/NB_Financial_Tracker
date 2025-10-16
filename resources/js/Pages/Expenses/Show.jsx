import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ expense, filters }) {
    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit(route('expenses.index'));
        }
    };
    return (
        <AuthenticatedLayout >
            <Head title={`"Expense"${expense.label}`}/>
            <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Expense Details
                    </h1>
                </div>

                <div className="space-y-5">
                    <div>
                        <InputLabel htmlFor="expense_label" value="Label" />
                        <TextInput
                            id="expense_label"
                            type="text"
                            value={expense.label}
                            readOnly
                            className="mt-1 block w-full cursor-default"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="expense_date" value="Expense Date" />
                        <TextInput
                            id="expense_date"
                            type="text"
                            value={expense.expense_date}
                            readOnly
                            className="mt-1 block w-full cursor-default"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="amount" value="Amount" />
                        <TextInput
                            id="amount"
                            type="text"
                            value={`₱${parseFloat(expense.amount).toLocaleString()}`}
                            readOnly
                            className="mt-1 block w-full cursor-default text-green-600 dark:text-green-400 font-semibold"
                        />
                    </div>

                    {expense.description && (
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <TextInput
                                id="description"
                                type="text"
                                value={expense.description}
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
