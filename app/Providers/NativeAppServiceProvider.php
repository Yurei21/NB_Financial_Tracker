<?php

namespace App\Providers;

use Exception;
use Illuminate\Support\Facades\DB;
use Native\Laravel\Facades\Window;
use Native\Laravel\Contracts\ProvidesPhpIni;

class NativeAppServiceProvider implements ProvidesPhpIni
{
    /**
     * Executed once the native application has been booted.
     * Use this method to open windows, register global shortcuts, etc.
     */
    public function boot(): void
    {
        Window::open()
        ->title('N&B Financial Tracker')
        ->resizable()
        ->minWidth(800)   
        ->minHeight(600)
        ->maximized();

        try{
            DB::statement('PRAGMA journal_mode=WAL;');
        } catch (Exception $e) {
            logger()->error('Failed to Enable WAL mode: ' .$e->getMessage());
        }
    }

    /**
     * Return an array of php.ini directives to be set.
     */
    public function phpIni(): array
    {
        return [
            'display_errors' => 'Off',
            'log_errors' => 'On',
            'error_log' => __DIR__.'/../../storage/logs/nativephp_error.log',
        ];
    }
}
