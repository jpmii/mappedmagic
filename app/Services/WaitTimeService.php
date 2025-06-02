<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WaitTimeService
{
    public function fetchWaitTime($apiId)
    {
        $cacheKey = "wait_time_{$apiId}";

        $response = Http::get("https://api.themeparks.wiki/v1/entity/{$apiId}/live");

        if ($response->status() === 429) {
            // If rate limited, return the cached value if available
            $cached = Cache::get($cacheKey);
            return [
                'error' => 'rate_limited',
                'cached_wait_time' => $cached,
                'retry_after' => $response->header('Retry-After'),
            ];
        }

        if ($response->successful()) {
            $data = $response->json();
            foreach ($data['liveData'] as $ld){
                $waitTime['status'] = $ld['status'] ?? null;
                $waitTime['operating_hours'] = $ld['operatingHours'] ?? null;
                $waitTime['standby_wait'] = $ld['queue']['STANDBY']['waitTime'] ?? null;
                $waitTime['single_rider'] = $ld['queue']['SINGLE_RIDER']['waitTime'] ?? null;
                $waitTime['paid_standby'] = $ld['queue']['PAID_STANDBY']['waitTime'] ?? null;
                $waitTime['boarding_group'] = $ld['queue']['BOARDING_GROUP']['estimatedWait'] ?? null;
            }
            // Cache the wait time for 5 minutes (adjust as needed)
            Cache::put($cacheKey, $waitTime, now()->addMinutes(5));
            return $waitTime;
        }

        // On other errors, return cached value if available
        return Cache::get($cacheKey);
    }
}