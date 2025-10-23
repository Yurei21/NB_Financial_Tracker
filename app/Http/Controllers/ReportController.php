<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportsResources;
use App\Models\Report;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportsRequest;
use App\Http\Requests\UpdateReportsRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedMonth = (int) $request->input('month', Carbon::now()->month);
        $selectedYear = (int) $request->input('year', Carbon::now()->year);

        $driver = DB::connection()->getDriverName();

        if ($driver === 'sqlite') {
            $availableYears = Report::selectRaw("DISTINCT strftime('%Y', month) as year")
                ->orderByDesc('year')
                ->pluck('year');
        } else {
            $availableYears = Report::selectRaw('DISTINCT EXTRACT(YEAR FROM month) as year')
                ->orderByDesc('year')
                ->pluck('year');
        }

        if ($driver === 'sqlite') {
            $report = Report::whereRaw("strftime('%Y', month) = ?", [(string) $selectedYear])
                ->whereRaw("strftime('%m', month) = ?", [str_pad((string) $selectedMonth, 2, '0', STR_PAD_LEFT)])
                ->first();
        } else {
            $report = Report::whereYear('month', $selectedYear)
                ->whereMonth('month', $selectedMonth)
                ->first();
        }

        $reportResource = $report ? new ReportsResources($report) : null;

        return inertia('Reports/Index', [
            'report' => $reportResource,
            'selectedMonth' => $selectedMonth,
            'selectedYear' => $selectedYear,
            'availableYears' => $availableYears,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $reports)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportsRequest $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $reports)
    {
        //
    }
}
