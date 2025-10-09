<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->date('month');
            $table->integer('total_orders');
            $table->decimal('total_income', 10,2);
            $table->decimal('total_expenses',10,2);
            $table->decimal('net_profit',10,2);
            $table->dateTime('generated_at');
            $table->json('daily_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
