import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react"

export default function Edit({orders}) {
    const {data, setData, post, errors, reset} = useForm({
        patient_name: orders.patient_name||'',
        amount: orders.amount||'',
        description: orders.description||'',
        order_date: orders.order_date||'',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault()
        
        post(route('orders.update', orders.id))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-gray-200 text-center">
                    Edit Order
                </h2>
            }
        >
            <Head title="Edit Order" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={onSubmit}className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel htmlFor="patient_name" value="Patient Name" />
                                <TextInput id="patient_name" type="text" name="patient_name" value={data.patient_name} className="mt-1 block w-full" isFocused={true} onChange={e => setData('patient_name', e.target.value)}/>
                                <InputError message={errors.patient_name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="description" />
                                <TextAreaInput id="description" type="text" name="description" value={data.description} className="mt-1 block w-full" isFocused={true} onChange={e => setData('description', e.target.value)}/>
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="amount" value="Amount" />
                                <TextInput id="amount" name="amount" value={data.amount} className="mt-1 block w-full" isFocused={true} onChange={e => setData('amount', e.target.value)}/>
                                <InputError message={errors.amount} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="order_date" value="Order Date" />
                                <TextInput id="order_date" type="date" name="expense_date" value={data.order_date} className="mt-1 block w-full" isFocused={true} onChange={e => setData('order_date', e.target.value)}/>
                                <InputError message={errors.order_date} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('orders.index')} className="bg-gray-100 px-3 py-1.5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>
                                <button className="bg-emerald-500 px-3 py-1 text-white rounded shadow transition-all hover:bg-emerald-600">Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}