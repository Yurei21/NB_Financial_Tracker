<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoicesResources;
use App\Models\Invoice;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoicesRequest;
use App\Http\Requests\UpdateInvoicesRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $date = $request->date ?? Carbon::today('Asia/Manila')->toDateString();

        $invoices = Invoice::with(['order.createdBy', 'order.modifiedBy'])
            ->whereHas('order', function ($query) use ($date) {
                $query->whereDate('order_date', $date);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->appends(['date' => $date])
            ->onEachSide(1);

        $totalAmount = Invoice::whereHas('order', function ($query) use ($date) {
            $query->whereDate('order_date', $date);
        })->sum('total_amount');

        $totalInvoices = Invoice::whereHas('order', function ($query) use ($date) {
            $query->whereDate('order_date', $date);
        })->count();

        return inertia('Invoices/Index', [
            'invoices' => InvoicesResources::collection($invoices),
            'filters' => ['date' => $date],
            'success' => session('success'),
            'totalAmount' => $totalAmount,
            'totalInvoices' => $totalInvoices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoicesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load('order'); 

        return inertia('Invoices/Show', [
            'invoice' => new InvoicesResources($invoice),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoicesRequest $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
