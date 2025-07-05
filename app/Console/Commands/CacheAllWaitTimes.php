<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Attraction;
use App\Models\Park;
use App\Services\WaitTimeService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CacheAllWaitTimes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'waittimes:cache-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and cache wait times for all attractions';

    /**
     * Execute the console command.
     */
    public function handle(WaitTimeService $waitTimeService)
    {
        $active = DB::table('sessions')
            ->where('last_activity', '>=', now()->subMinutes(15)->timestamp)
            ->exists();

        if (! $active) {
            $this->info('No users logged in, skipping.');
            return 0;
        }else {
            Log::info('Users are logged in, proceeding to cache wait times.');
        }

        $parks = Park::all();
        Log::info("CacheAllWaitTimes: Starting cache process for {$parks->count()} parks");

        foreach ($parks as $park) {
            if ($park->api_id) {
                Log::info("CacheAllWaitTimes: Processing park: {$park->name} (API ID: {$park->api_id})");
                
                $waitTime = $waitTimeService->fetchWaitTime($park->api_id);
                
                // Log the structure of the data being cached
                Log::info("CacheAllWaitTimes: Data structure for {$park->name}", [
                    'has_error' => isset($waitTime['error']),
                    'has_park_info' => isset($waitTime['park_info']),
                    'entities_count' => isset($waitTime['entities']) ? count($waitTime['entities']) : 0,
                    'entity_types' => isset($waitTime['entities']) ? array_unique(array_column($waitTime['entities'], 'entityType')) : [],
                    'sample_entity' => isset($waitTime['entities'][0]) ? [
                        'id' => $waitTime['entities'][0]['id'],
                        'name' => $waitTime['entities'][0]['name'],
                        'entityType' => $waitTime['entities'][0]['entityType'],
                        'has_queue' => isset($waitTime['entities'][0]['queue']),
                        'queue_types' => isset($waitTime['entities'][0]['queue']) ? array_keys($waitTime['entities'][0]['queue']) : []
                    ] : null
                ]);
                
                Cache::forever("wait_time_{$park->api_id}", $waitTime);
                
                Log::info("CacheAllWaitTimes: Cached data for {$park->name}", [
                    'cache_key' => "wait_time_{$park->api_id}",
                    'cache_duration' => 'forever'
                ]);
            } else {
                Log::warning("CacheAllWaitTimes: Park {$park->name} has no API ID, skipping");
            }
        }
        
        Log::info("CacheAllWaitTimes: Completed caching process");
        $this->info('All wait times cached!');
    }
}
