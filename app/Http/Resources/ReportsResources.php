<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportsResources extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $month = $this->month ? Carbon::parse($this->month) : null;
        $generatedAt = $this->generated_at ? Carbon::parse($this->generated_at) : null;

        $dailyData = json_decode($this->daily_data, true) ?? [];

        return [
            'id' => $this->id,
            'month' => $month?->format('Y-m-d'),
            'year' => $month?->format('Y'),
            'total_orders' => $this->total_orders,
            'total_income' => number_format($this->total_income, 2),
            'total_expenses' => number_format($this->total_expenses, 2),
            'net_profit' => number_format($this->net_profit, 2),
            'generated_at' => $generatedAt?->format('Y-m-d H:i:s'),

            'daily_data' => collect($dailyData)->map(function ($day) {
                return [
                    'date' => $day['date'] ?? null,
                    'day' => $day['day'] ?? null,
                    'total_order' => $day['total_orders'] ?? 0,
                    'total_income' => number_format($day['total_income'] ?? 0, 2),
                    'total_expenses' => number_format($day['total_expenses'] ?? 0, 2),
                    'net_profit' => number_format($day['net_profit'] ?? 0, 2),
                ];
            })->values(),
        ];
    }
}
