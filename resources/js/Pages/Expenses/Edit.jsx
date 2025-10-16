import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react"

export default function Create({expenses}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        label: expenses.label || '',
        amount: expenses.amount || '',
        description: expenses.description || '',
        expense_date: expenses.expense_date || '',
        _method: "PUT"
    })

    const onSubmit = (e) => {
        e.preventDefault()
        
        post(route('expenses.update', expenses.id))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center">
                    Create Expense
                </h2>
            }
        >
            <Head title="Create an Expense" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={onSubmit}className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel htmlFor="label" value="Label " />
                                <TextInput id="label" type="text" name="label" value={data.label} className="mt-1 block w-full" isFocused={true} onChange={e => setData('label', e.target.value)}/>
                                <InputError message={errors.label} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <TextAreaInput id="description" type="text" name="description" value={data.description} className="mt-1 block w-full" isFocused={true} onChange={e => setData('description', e.target.value)}/>
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="amount" value="Amount" />
                                <TextInput id="amount" name="amount" value={data.amount} className="mt-1 block w-full" isFocused={true} onChange={e => setData('amount', e.target.value)}/>
                                <InputError message={errors.amount} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="expense_date" value="Expense Date" />
                                <TextInput id="expense_date" type="date" name="expense_date" value={data.expense_date} className="mt-1 block w-full" isFocused={true} onChange={e => setData('expense_date', e.target.value)}/>
                                <InputError message={errors.expense_date} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('expenses.index')} className="bg-gray-100 px-3 py-1.5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>
                                <button className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600">Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}