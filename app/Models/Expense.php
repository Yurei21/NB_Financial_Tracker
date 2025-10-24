<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpensesFactory> */
    use HasFactory;
        protected $fillable = [
        'label',
        'expense_date',
        'amount',
        'description',
        'created_by',
        'modified_by'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modifiedBy()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }

    protected static function booted()
    {
        static::saved(fn() => Cache::flush());
        static::deleted(fn() => Cache::flush());
    }
}
