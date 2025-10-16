<?php

namespace App\Providers;

use App\Models\Expense;
use App\Models\Order;
use App\Services\ReportService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Orders
        Order::saved(function ($order) {
            ReportService::updateForDate($order->order_date);
        });
        Order::deleted(function ($order) {
            ReportService::updateForDate($order->order_date);
        });

        // Expenses
        Expense::saved(function ($expense) {
            ReportService::updateForDate($expense->expense_date);
        });
        Expense::deleted(function ($expense) {
            ReportService::updateForDate($expense->expense_date);
        });
        Vite::prefetch(concurrency: 3);
    }
}
