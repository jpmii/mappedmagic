<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WaitTimeController extends Controller
{
    public function index(Request $request)
    {
        $parkIds = $request->query('park_ids', []);
        $waitTimes = [];
        
        foreach ($parkIds as $parkId) {
            // Try to get cached data by park ID first
            $cached = Cache::get("wait_time_{$parkId}");
            if ($cached) {
                $waitTimes[$parkId] = $cached;
            }
        }
        
        return response()->json($waitTimes);
    }
} 