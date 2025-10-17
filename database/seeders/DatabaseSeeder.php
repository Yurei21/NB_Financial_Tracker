<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $user = User::factory()->create([
        ]);

        Order::factory()->count(20)->create([
            'created_by' => $user->id,
            'modified_by' => $user->id,
        ]);

        Expense::factory()->count(20)->create([
            'created_by' => $user->id,
            'modified_by' => $user->id,
        ]);
    }
}
