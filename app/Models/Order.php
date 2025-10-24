<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'patient_name',
        'order_date',
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

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    protected static function booted()
{
    static::saved(fn() => Cache::flush());
    static::deleted(fn() => Cache::flush());
}
}
