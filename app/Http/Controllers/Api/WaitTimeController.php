<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WaitTimeController extends Controller
{
    public function index(Request $request)
    {
        $ids = $request->query('attraction_ids', []);
        $waitTimes = [];
        foreach ($ids as $id) {
            $cached = Cache::get("wait_time_{$id}");
            $waitTimes[$id] = $cached ?: null;
        }
        return response()->json($waitTimes);
    }
} 