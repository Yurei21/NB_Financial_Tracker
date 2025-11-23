<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->date ?? Carbon::today('Asia/Manila')->toDateString();

        $orders = Order::with(['createdBy', 'modifiedBy'])
            ->whereDate('order_date', $date)
            ->orderBy('order_date', 'desc')
            ->paginate(5)
            ->appends(['date' => $date])
            ->onEachSide(1);

        $amount = Order::whereDate('order_date', $date)->sum('amount');

        return inertia('Orders/Index', [
            'orders' => OrderResource::collection($orders),
            'filters' => ['date' => $date],
            'success' => session('success'),
            'totalAmount' => $amount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Orders/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Order::create($data);

        return to_route('orders.index')->with('success', 'Order has been created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return inertia('Orders/Show', [
            'order' => new OrderResource($order),
            'filters' => ['date' => request('date'), 'page' => request('page')]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return inertia('Orders/Edit', ['orders' => $order]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data = $request->validated();
        $data['modified_by'] = Auth::id();

        $order->update($data);

        return to_route('orders.index')->with('success', 'Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order, Request $request)
    {
        $order->delete();
        return to_route('orders.index', [
            'date' => $request->date ?? now()->toDateString(),
            'page' => $request->page,
        ])->with('success', 'Record has been deleted');
    }

    public function import()
    {
        return inertia('Orders/Import');
    }

public function importAccess(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:txt,text'
    ]);

    $file = $request->file('file');
    if (!$file || !$file->isValid()) {
        return back()->withErrors(['file' => 'File upload failed']);
    }

    $lines = file($file->getRealPath(), FILE_IGNORE_NEW_LINES);
    $headerIndexes = [];

    foreach ($lines as $lineNumber => $line) {
        $line = trim($line);

        // Skip lines that do not start with pipe
        if (!str_starts_with($line, '|')) continue;

        // Split by pipe, trim spaces
        $cols = array_map('trim', explode('|', $line));

        // Skip empty rows
        if (empty($cols)) continue;

        // Detect header row dynamically
        if (empty($headerIndexes) && in_array('PatientName', $cols)) {
            $headerIndexes = array_flip($cols); // column name => index
            continue;
        }

        // Skip if header not yet detected
        if (empty($headerIndexes)) continue;

        // Extract PatientName (required)
        $patientNameCol = $headerIndexes['PatientName'] ?? null;
        $patientName = $patientNameCol !== null && isset($cols[$patientNameCol]) ? $cols[$patientNameCol] : null;
        if (!$patientName) continue;

        // Extract TotalAmount and OrderTest if available
        $totalAmountCol = $headerIndexes['TotalAmount'] ?? null;
        $descriptionCol = $headerIndexes['OrderTest'] ?? null;

        $totalAmount = $totalAmountCol !== null && isset($cols[$totalAmountCol]) ? $cols[$totalAmountCol] : null;
        $description = $descriptionCol !== null && isset($cols[$descriptionCol]) ? $cols[$descriptionCol] : null;

        // Detect TransactionDate by scanning all columns
        $orderDate = null;
        foreach ($cols as $col) {
            if (preg_match('/^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}$/', $col)) {
                try {
                    $orderDate = Carbon::createFromFormat('m/d/Y G:i', $col);
                    break;
                } catch (\Exception $e) {
                    continue;
                }
            }
        }

        if (!$orderDate) {
            Log::info("Skipping row, cannot find valid date at line " . ($lineNumber + 1) . ": " . implode('|', $cols));
            continue;
        }

        // Save order
        try {
            Order::create([
                'patient_name' => $patientName,
                'order_date'   => $orderDate,
                'amount'       => $totalAmount ? (float) str_replace([',', '₱'], '', $totalAmount) : 0,
                'description'  => $description,
                'created_by'   => Auth::id(),
                'modified_by'  => Auth::id(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to create order at line " . ($lineNumber + 1) . ": " . $e->getMessage());
            continue;
        }
    }

    return to_route('orders.index')->with('success', 'MS Access export imported successfully!');
}


}
