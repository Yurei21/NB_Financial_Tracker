<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // --- Today's Totals ---
        $todayTotals = Cache::remember("dashboard.totals.{$today->toDateString()}", 3600, function () use ($today) {
            $todayOrders = Order::whereDate('order_date', $today)->sum('amount');
            $todayExpenses = Expense::whereDate('expense_date', $today)->sum('amount');
            $netIncome = $todayOrders - $todayExpenses;

            return [
                'orderAmount' => (float) $todayOrders,
                'expenseAmount' => (float) $todayExpenses,
                'netIncome' => (float) $netIncome,
            ];
        });

        // --- Pie Chart (current month) ---
        $pieData = Cache::remember("dashboard.pie." . Carbon::now()->format('Y-m'), 86400, function () use ($currentMonth, $currentYear) {
            return Expense::whereYear('expense_date', $currentYear)
                ->whereMonth('expense_date', $currentMonth)
                ->get(['label', 'amount'])
                ->groupBy('label')
                ->map(function ($group, $label) {
                    return [
                        'label' => $label,
                        'value' => $group->sum('amount'),
                    ];
                })
                ->values()
                ->map(function ($item, $index) {
                    return [
                        'id' => $index,
                        'label' => $item['label'],
                        'value' => (float) $item['value'],
                    ];
                })
                ->toArray();
        });

        // --- Line Chart (last 7 days) ---
        $lineData = Cache::remember("dashboard.line." . $today->toDateString(), 3600, function () {
            $dates = collect(range(6, 0))->map(fn($i) => Carbon::today()->subDays($i));

            $data = $dates->map(function ($date) {
                $orders = Order::whereDate('order_date', $date)->sum('amount');
                $expenses = Expense::whereDate('expense_date', $date)->sum('amount');

                return [
                    'date' => $date->format('M d'),
                    'orders' => (float) $orders,
                    'expenses' => (float) $expenses,
                ];
            });

            return [
                'labels' => $data->pluck('date')->toArray(),
                'orders' => $data->pluck('orders')->toArray(),
                'expenses' => $data->pluck('expenses')->toArray(),
            ];
        });

        return Inertia::render('Dashboard', array_merge($todayTotals, [
            'pieData' => $pieData,
            'lineData' => $lineData,
        ]));
    }
}
