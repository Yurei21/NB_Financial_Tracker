<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoicesResources extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id, // keep this as ID, not a resource
            'order' => new OrderResource($this->whenLoaded('order')), 
            'transaction_id' => $this->transaction_id,
            'amount' => $this->total_amount, 
            'description' => $this->description,
            'date' => (new Carbon($this->created_at))->format('Y-m-d'),
            'created_by' => $this->order?->createdBy?->username ?? 'unknown',
            'modified_by' => $this->order?->modifiedBy?->username ?? null,
        ];
    }
}
