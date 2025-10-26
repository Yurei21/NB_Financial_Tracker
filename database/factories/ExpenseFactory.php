<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => $this->faker->word(),
            'expense_date' => now(),
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'description' => $this->faker->sentence(), 
            'created_by' => 1,
            'modified_by' => 1,
        ];
    }
}
