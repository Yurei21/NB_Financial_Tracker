<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpensesResource extends JsonResource
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
            'label' => $this->label,
            'description' => $this->description,
            'expense_date' => (new Carbon($this->expense_date))->format('Y-m-d'),
            'amount' => $this->amount,
            'created_by' => $this->createdBy?->username,
            'modified_by' => $this->modifiedBy?->username,
        ];
    }
}
