import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Import({}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', data.file);
        post(route('orders.importAccess'), {
            preserveScroll: true,
            transformFormData: (form) => form, 
            onError: (errors) => console.log(errors),
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center">
                    Import
                </h2>
            }
        >
            <Head title="Create an Order" />

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
                        Import
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="file" value="Import the txt file" />
                            <TextInput
                                id="file"
                                type="file"
                                name="file"
                                className="mt-1 block w-full text-sm text-gray-700 dark:text-gray-200"
                                accept=".txt"
                                onChange={(e) => setData("file", e.target.files[0])}
                            />
                            <InputError message={errors.file} className="mt-2" />
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4">
                            <Link
                                href={route("orders.index")}
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