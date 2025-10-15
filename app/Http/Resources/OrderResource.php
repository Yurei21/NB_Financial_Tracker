<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'patient_name' => $this->patient_name,
            'order_date' => (new Carbon($this->order_date))->format('Y-m-d'),
            'amount' => $this->amount,
            'description' => $this->description,
            'created_by' => $this->createdBy?->username,
            'modified_by' => $this->modifiedBy?->username,
        ];
    }
}
