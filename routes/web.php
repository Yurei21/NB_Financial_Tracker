<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\InvoicesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [ 'auth' => Auth::user() ]);
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::resource('orders', OrderController::class);
    Route::resource('expenses', ExpensesController::class);
    Route::resource('invoices', InvoicesController::class)
         ->only(['index', 'show']); 
    Route::resource('reports', ReportController::class)
         ->only(['index']); 
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
