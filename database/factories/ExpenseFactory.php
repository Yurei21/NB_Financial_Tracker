<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
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
        $startOfMonth = Carbon::now()->startOfMonth();
        $daysInMonth = $startOfMonth->daysInMonth;
        $today = Carbon::now();

        // 60% chance to use today's date, 40% chance to use a random day in the month
        $useToday = $this->faker->numberBetween(1, 100) <= 60;

        if ($useToday) {
            $expenseDate = $today->copy();
        } else {
            $randomDay = $this->faker->numberBetween(1, $daysInMonth);
            $expenseDate = Carbon::createFromDate(
                $startOfMonth->year,
                $startOfMonth->month,
                $randomDay
            );
        }

        return [
            'label' => $this->faker->word(),
            'expense_date' => $expenseDate,
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'description' => $this->faker->sentence(),
            'created_by' => 1,
            'modified_by' => 1,
        ];
    }
}
