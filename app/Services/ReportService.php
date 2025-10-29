<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Order;
use App\Models\Report;
use Carbon\Carbon;

class ReportService
{
    public static function updateForDate($date)
    {
        $date = Carbon::parse($date);
        $monthStart = $date->copy()->startOfMonth();

        $totalOrders = Order::whereDate('order_date', $date)->count();
        $totalIncome = Order::whereDate('order_date', $date)->sum('amount');
        $totalExpenses = Expense::whereDate('expense_date', $date)->sum('amount');
        $netProfit = $totalIncome - $totalExpenses;

        $report = Report::firstOrCreate(
            ['month' => $monthStart],
            [
                'total_orders' => 0,
                'total_income' => 0,
                'total_expenses' => 0,
                'net_profit' => 0,
                'generated_at' => now(),
                'daily_data' => json_encode([]),
            ]
        );

        $data = json_decode($report->daily_data, true) ?? [];

        $data[$date->toDateString()] = [
            'date' => $date->toDateString(),
            'day' => $date->format('l'),
            'total_orders' => $totalOrders,
            'total_income' => $totalIncome,
            'total_expenses' => $totalExpenses,
            'net_profit' => $netProfit,
        ];

        ksort($data);

        $totalOrdersMonth = array_sum(array_column($data, 'total_orders'));
        $totalIncomeMonth = array_sum(array_column($data, 'total_income'));
        $totalExpensesMonth = array_sum(array_column($data, 'total_expenses'));
        $netProfitMonth = $totalIncomeMonth - $totalExpensesMonth;

        $report->update([
            'daily_data' => json_encode($data),
            'total_orders' => $totalOrdersMonth,
            'total_income' => $totalIncomeMonth,
            'total_expenses' => $totalExpensesMonth,
            'net_profit' => $netProfitMonth,
            'generated_at' => now(),
        ]);
    }
}