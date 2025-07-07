<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class WaitTimeController extends Controller
{
    public function index(Request $request)
    {
        Log::info('WaitTimeController accessed', [
            'user' => $request->user()?->id,
            'park_ids' => $request->query('park_ids', []),
            'authenticated' => Auth::check()
        ]);
        
        $parkIds = $request->query('park_ids', []);
        $waitTimes = [];
        
        foreach ($parkIds as $parkId) {
            // Try to get cached data by park ID first
            $cached = Cache::get("wait_time_{$parkId}");
            if ($cached) {
                $waitTimes[$parkId] = $cached;
            }
        }
        
        Log::info('WaitTimeController returning data', ['wait_times_count' => count($waitTimes)]);
        
        return response()->json($waitTimes);
    }
} 