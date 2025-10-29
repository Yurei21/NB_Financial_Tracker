<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $daysInMonth = $startOfMonth->daysInMonth;

        $randomDay = $this->faker->numberBetween(1, $daysInMonth);
        $orderDate = Carbon::createFromDate(
            $startOfMonth->year,
            $startOfMonth->month,
            $randomDay
        );
        
        return [
            'patient_name' => $this->faker->name(),
            'order_date' => $orderDate,
            'amount' => $this->faker->randomFloat(2, 50, 1000), 
            'description' => $this->faker->sentence(),
            'created_by' => User::factory(), 
            'modified_by' => User::factory(), 
        ];
    }
}
