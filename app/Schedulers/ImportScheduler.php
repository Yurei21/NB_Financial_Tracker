<?php

use App\Services\ImportService;
use Illuminate\Support\Facades\Log;

return function (\Illuminate\Console\Scheduling\Schedule $schedule) {
    $schedule->call(function () {
        Log::info("Scheduler triggered");

        $folder = storage_path('app/imports');
        Log::info("Looking in: " . $folder);

        $files = glob($folder . '/*.txt');
        Log::info("Files found: " . json_encode($files));

        if (empty($files)) return;

        $importer = app(ImportService::class);

        foreach ($files as $file) {
            try {
                $importer->importAccessFromPath($file);
                Log::info("Imported file: {$file}");
                unlink($file);
            } catch (\Exception $e) {
                Log::error("Failed to import {$file}: " . $e->getMessage());
            }
        }
    })
    ->name('import-scheduler')
    ->everyMinute()
    ->withoutOverlapping();
};