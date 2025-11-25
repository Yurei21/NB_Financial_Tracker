<?php

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


$scheduleClosure = require base_path('app/Schedulers/ImportScheduler.php');

app()->booted(function () use ($scheduleClosure) {
    $scheduleClosure(app(Schedule::class));
});