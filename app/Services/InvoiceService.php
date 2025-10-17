<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Invoice;

class InvoiceService
{
    public static function generate(Order $order)
    {
        $year = now()->format('Y');

        $lastInvoice = Invoice::whereYear('created_at', $year)->orderByDesc('id')->first();
        
        $nextNumber = 1;

        if($lastInvoice) {
            $lastNumber = (int) substr($lastInvoice->transaction_id, -4);
            $nextNumber = $lastNumber + 1;
        }

        $transactionId = sprintf('INV-%s-%04d', $year, $nextNumber);

        return Invoice::updateOrCreate(
            ['order_id' => $order->id],
            [
                'transaction_id' => $transactionId,
                'amount' => $order->amount,
                'description' => $order->description
            ]
        );
    }

    public static function delete(Order $order)
    {
        Invoice::where('order_id', $order->id)->delete();
    }
}