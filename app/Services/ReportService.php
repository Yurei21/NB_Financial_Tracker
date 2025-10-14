<?php

namespace App\Services;

use App\Models\Expenses;
use App\Models\Order;
use App\Models\Reports;
use Carbon\Carbon;

class ReportService
{
    public static function updateForDate($date)
    {
        $date = Carbon::parse($date);
        $monthStart = $date->copy()->startOfMonth();

        $totalOrders = Order::whereDate('order_date', $date)->count();
        $totalIncome = Order::whereDate('order_date', $date)->sum('amount');
        $totalExpenses = Expenses::whereDate('expense_date', $date)->sum('amount');

        $report = Reports::firstOrCreate(
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
            'total_orders' => $totalOrders,
            'total_income' => $totalIncome,
            'total_expenses' => $totalExpenses,
        ];

        $report->update([
            'daily_data' => $data,
            'total_orders' => array_sum(array_column($data, 'total_orders')),
            'total_income' => array_sum(array_column($data, 'total_income')),
            'total_expenses' => array_sum(array_column($data, 'total_expenses')),
            'net_profit' => array_sum(array_column($data, 'total_income')) - array_sum(array_column($data, 'total_expenses')),
            'generated_at' => now(),
        ]);
    }
}