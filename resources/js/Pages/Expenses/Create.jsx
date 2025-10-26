import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({}) {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
    const { data, setData, post, processing, errors } = useForm({
        label: "",
        amount: "",
        description: "",
        expense_date: today,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("expenses.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center">
                    Create Expense
                </h2>
            }
        >
            <Head title="Create an Expense" />

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 animate-fadeIn">
                <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 relative transform transition-all duration-300 scale-100 hover:scale-[1.01]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => window.history.back()}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                        Create New Expense
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="label" value="Label" />
                            <TextInput
                                id="label"
                                type="text"
                                name="label"
                                value={data.label}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("label", e.target.value)}
                            />
                            <InputError message={errors.label} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <TextAreaInput
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="amount" value="Amount" />
                            <TextInput
                                id="amount"
                                name="amount"
                                value={data.amount}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("amount", e.target.value)}
                            />
                            <InputError message={errors.amount} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="expense_date" value="Expense Date" />
                            <TextInput
                                id="expense_date"
                                type="date"
                                name="expense_date"
                                value={data.expense_date}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("expense_date", e.target.value)}
                            />
                            <InputError message={errors.expense_date} className="mt-2" />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link
                                href={route("expenses.index")}
                                className="bg-gray-100 px-3 py-1.5 text-gray-800 rounded shadow transition-all hover:bg-gray-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-500 px-4 py-1.5 text-white rounded shadow transition-all hover:bg-emerald-600 disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Enter"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}