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
            // First try to get the park to find its API ID
            $park = \App\Models\Park::find($parkId);
            if ($park && $park->api_id) {
                // Try to get cached data by API ID
                $cached = Cache::get("wait_time_{$park->api_id}");
                if ($cached) {
                    $waitTimes[$parkId] = $cached;
                    Log::info("Found cached data for park {$parkId} using API ID {$park->api_id}");
                } else {
                    Log::info("No cached data found for park {$parkId} (API ID: {$park->api_id})");
                }
            } else {
                Log::warning("Park {$parkId} not found or has no API ID");
            }
        }
        
        Log::info('WaitTimeController returning data', ['wait_times_count' => count($waitTimes)]);
        
        return response()->json($waitTimes);
    }
} 