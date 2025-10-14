<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    /** @use HasFactory<\Database\Factories\ReportsFactory> */
    use HasFactory;
        protected $fillable = [
        'month',
        'total_orders',
        'total_income',
        'total_expenses',
        'net_profit',
        'generated_at',
        'daily_data', 
    ];
}
