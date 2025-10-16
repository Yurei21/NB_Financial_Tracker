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
}
