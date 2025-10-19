<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoicesFactory> */
    use HasFactory;
    protected $fillable = [
        'order_id',
        'transaction_id',
        'total_amount',
        'description',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
