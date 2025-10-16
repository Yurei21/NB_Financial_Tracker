<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpensesResource;
use App\Http\Resources\OrderResource;
use App\Models\Expense;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpensesRequest;
use App\Http\Requests\UpdateExpensesRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->date ?? Carbon::today('Asia/Manila')->toDateString();

        $expenses = Expense::with(['createdBy', 'modifiedBy'])
            ->whereDate('expense_date', $date)
            ->orderBy('expense_date', 'desc')
            ->paginate(5)
            ->appends(['date' => $date])
            ->onEachSide(1);

        $amount = Expense::whereDate('expense_date', $date)->sum('amount');

        return inertia('Expenses/Index', [
            'expenses' => ExpensesResource::collection($expenses),
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
        return inertia("Expenses/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpensesRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['modified_by'] = Auth::id();

        Expense::create($data);

        return to_route('expenses.index')->with('success', 'Expense has been created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        return inertia("Expenses/Show", [
            "expense" => new ExpensesResource($expense),
            "filters" =>['date' => request('date'), 'page' => request('page')]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        return inertia("Expenses/Edit", ["expenses" => $expense]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpensesRequest $request, Expense $expense)
    {
        $data = $request->validated();
        $data["modified_by"] = Auth::id();

        $expense->update($data);
        
        return to_route('expenses.index')->with('success', 'Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense, Request $request)
    {
        $expense->delete(); 

        return to_route('expenses.index', [
            'date' => $request->date ?? now()->toDateString(),
            'page' => $request->page,
        ])->with('success', 'Record has been deleted');
    }
}
