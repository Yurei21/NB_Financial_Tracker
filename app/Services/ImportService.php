<?php

namespace App\Services;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ImportService {

    /**
     * Import file from an uploaded file (like from a form)
     */
    public function importAccess($file)
    {
        $lines = file($file->getRealPath(), FILE_IGNORE_NEW_LINES);
        $this->processLines($lines, $file->getRealPath());
    }

    /**
     * Import file from a local path (used in scheduler)
     */
    public function importAccessFromPath(string $filePath)
    {
        if (!file_exists($filePath)) {
            Log::warning("File not found: {$filePath}");
            return;
        }

        $lines = file($filePath, FILE_IGNORE_NEW_LINES);
        $this->processLines($lines, $filePath);
    }

    /**
     * Process lines and insert Orders
     * Accepts both uploaded files and scheduler paths
     */
    private function processLines(array $lines, string $filePath)
    {
        $headerIndexes = [];

        foreach ($lines as $lineNumber => $line) {
            $line = trim($line);
            if (!str_starts_with($line, '|')) continue;

            $cols = array_map('trim', explode('|', $line));
            if (empty($cols)) continue;

            // detect header row
            if (empty($headerIndexes) && in_array('PatientName', $cols)) {
                $headerIndexes = array_flip($cols);
                continue;
            }
            if (empty($headerIndexes)) continue;

            $patientNameCol = $headerIndexes['PatientName'] ?? null;
            $patientName = $patientNameCol !== null && isset($cols[$patientNameCol]) ? $cols[$patientNameCol] : null;
            if (!$patientName) continue;

            $totalAmountCol = $headerIndexes['TotalAmount'] ?? null;
            $descriptionCol = $headerIndexes['OrderTest'] ?? null;

            $totalAmount = $totalAmountCol !== null && isset($cols[$totalAmountCol]) ? $cols[$totalAmountCol] : null;
            $description = $descriptionCol !== null && isset($cols[$descriptionCol]) ? $cols[$descriptionCol] : null;

            $orderDate = null;
            foreach ($cols as $col) {
                if (preg_match('/^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}$/', $col)) {
                    try {
                        $orderDate = Carbon::createFromFormat('m/d/Y G:i', $col);
                        break;
                    } catch (\Exception $e) {
                        continue;
                    }
                }
            }

            if (!$orderDate) {
                Log::info("Skipping row, cannot find valid date at line " . ($lineNumber + 1) . ": " . implode('|', $cols));
                continue;
            }

            try {
                Order::create([
                    'patient_name' => $patientName,
                    'order_date'   => $orderDate,
                    'amount'       => $totalAmount ? (float) str_replace([',', '₱'], '', $totalAmount) : 0,
                    'description'  => $description,
                    'created_by'   => Auth::id() ?? 1, 
                    'modified_by'  => Auth::id() ?? 1,
                ]);
            } catch (\Exception $e) {
                Log::error("Failed to create order at line " . ($lineNumber + 1) . ": " . $e->getMessage());
                continue;
            }
        }

        // ✅ use $filePath directly
        Log::info("Finished importing file: {$filePath}");
    }
}
