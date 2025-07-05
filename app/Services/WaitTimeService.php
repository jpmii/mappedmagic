<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class WaitTimeService
{
    /**
     * Fetch live data for a specific entity (attraction, show, restaurant, etc.)
     */
    public function fetchWaitTime($apiId)
    {
        $cacheKey = "wait_time_{$apiId}";
        $api_key = env('THEMEPARKS_API_KEY');
        $response = Http::withHeaders([
            'x-api-key' => $api_key,
        ])->get("https://api.themeparks.wiki/v1/entity/{$apiId}/live");

        if ($response->status() === 429) {
            // If rate limited, return the cached value if available
            $cached = Cache::get($cacheKey);
            Log::warning("WaitTimeService: Rate limited for API ID: {$apiId}, returning cached data", [
                'cached_exists' => !is_null($cached),
                'cached_structure' => $cached ? array_keys($cached) : null
            ]);
            return [
                'error' => 'rate_limited',
                'cached_data' => $cached,
                'retry_after' => $response->header('Retry-After'),
            ];
        }

        if ($response->successful()) {
            $data = $response->json();          
            $liveData = $this->extractLiveData($data);
            /*
            Log::info("WaitTimeService: Extracted live data for {$apiId}", [
                'entities_count' => count($liveData['entities'] ?? []),
                'entity_types' => array_unique(array_column($liveData['entities'] ?? [], 'entityType')),
                'park_info' => $liveData['park_info'] ?? null
            ]);
            */
            
            // Cache the live data for 5 minutes
            Cache::put($cacheKey, $liveData, now()->addMinutes(5));
            return $liveData;
        }

        // On other errors, return cached value if available
        $cached = Cache::get($cacheKey);
        Log::error("WaitTimeService: API error for {$apiId}, returning cached data", [
            'status_code' => $response->status(),
            'cached_exists' => !is_null($cached)
        ]);
        return $cached;
    }

    /**
     * Extract and structure live data from the API response
     */
    private function extractLiveData($data)
    {
        $result = [
            'park_info' => [
                'id' => $data['id'] ?? null,
                'name' => $data['name'] ?? null,
                'entityType' => $data['entityType'] ?? null,
                'timezone' => $data['timezone'] ?? null,
            ],
            'entities' => []
        ];

        if (isset($data['liveData']) && is_array($data['liveData'])) {
            foreach ($data['liveData'] as $entity) {
                $entityData = [
                    'id' => $entity['id'] ?? null,
                    'name' => $entity['name'] ?? null,
                    'entityType' => $entity['entityType'] ?? null,
                    'parkId' => $entity['parkId'] ?? null,
                    'externalId' => $entity['externalId'] ?? null,
                    'status' => $entity['status'] ?? null,
                    'lastUpdated' => $entity['lastUpdated'] ?? null,
                ];

                // Extract queue information
                if (isset($entity['queue'])) {
                    $entityData['queue'] = $this->extractQueueData($entity['queue']);
                }

                // Extract operating hours
                if (isset($entity['operatingHours'])) {
                    $entityData['operatingHours'] = $entity['operatingHours'];
                }

                // Extract showtimes for shows
                if (isset($entity['showtimes'])) {
                    $entityData['showtimes'] = $entity['showtimes'];
                }

                $result['entities'][] = $entityData;
            }
        }

        return $result;
    }

    /**
     * Extract queue data with wait times and other queue information
     */
    private function extractQueueData($queue)
    {
        $queueData = [];

        foreach ($queue as $queueType => $queueInfo) {
            $queueData[$queueType] = [
                'waitTime' => $queueInfo['waitTime'] ?? null,
                'state' => $queueInfo['state'] ?? null,
            ];

            // Handle return time data
            if (isset($queueInfo['returnStart'])) {
                $queueData[$queueType]['returnStart'] = $queueInfo['returnStart'];
            }
            if (isset($queueInfo['returnEnd'])) {
                $queueData[$queueType]['returnEnd'] = $queueInfo['returnEnd'];
            }

            // Handle paid queue pricing
            if (isset($queueInfo['price'])) {
                $queueData[$queueType]['price'] = $queueInfo['price'];
            }
        }

        return $queueData;
    }

    /**
     * Get wait time for a specific entity by its ID
     */
    public function getEntityWaitTime($apiId, $entityId = null)
    {
        $data = $this->fetchWaitTime($apiId);
        
        if (isset($data['error'])) {
            return $data;
        }

        // If no specific entity ID requested, return all entities
        if (!$entityId) {
            return $data;
        }

        // Find specific entity
        foreach ($data['entities'] as $entity) {
            if ($entity['id'] === $entityId) {
                return $entity;
            }
        }

        return null;
    }

    /**
     * Get all attractions with wait times
     */
    public function getAttractions($apiId)
    {
        $data = $this->fetchWaitTime($apiId);
        
        if (isset($data['error'])) {
            return $data;
        }

        return array_filter($data['entities'], function($entity) {
            return $entity['entityType'] === 'ATTRACTION';
        });
    }

    /**
     * Get all shows with showtimes
     */
    public function getShows($apiId)
    {
        $data = $this->fetchWaitTime($apiId);
        
        if (isset($data['error'])) {
            return $data;
        }

        return array_filter($data['entities'], function($entity) {
            return $entity['entityType'] === 'SHOW';
        });
    }

    /**
     * Get all restaurants
     */
    public function getRestaurants($apiId)
    {
        $data = $this->fetchWaitTime($apiId);
        
        if (isset($data['error'])) {
            return $data;
        }

        return array_filter($data['entities'], function($entity) {
            return $entity['entityType'] === 'RESTAURANT';
        });
    }

    /**
     * Clear cache for a specific entity
     */
    public function clearCache($apiId)
    {
        $cacheKey = "wait_time_{$apiId}";
        Log::info("WaitTimeService: Clearing cache for {$apiId}");
        return Cache::forget($cacheKey);
    }
}