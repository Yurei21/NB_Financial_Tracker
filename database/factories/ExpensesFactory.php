<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpensesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => $this->faker->sentence(),
            'description' => $this->faker->name(),
            'expense_date' => now(),
            'amount' => $this->faker->randomFloat(2, 50, 1000), 
            'created_by' => User::factory(), 
            'modified_by' => User::factory(), 
        ];
    }
}
