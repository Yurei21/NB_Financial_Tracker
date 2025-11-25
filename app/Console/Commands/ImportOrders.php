<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $folder = storage_path('app/imports');
        $files = glob($folder . '/*.txt');

        $importer = app(\App\Services\ImportService::class);

        foreach ($files as $file) {
            try {
                $importer->importAccessFromPath($file); 
                unlink($file);
                $this->info("Imported {$file}");
            } catch (\Exception $e) {
                $this->error("Failed {$file}: {$e->getMessage()}");
            }
        }
    }
}
