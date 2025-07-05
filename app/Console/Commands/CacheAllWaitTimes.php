<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Attraction;
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
            Log::info('No users logged in, skipping.');
            return 0;
        }else {
            Log::info('Users are logged in, proceeding to cache wait times.');
        }

        foreach (Attraction::all() as $attraction) {
            if ($attraction->api_id) {
                $waitTime = $waitTimeService->fetchWaitTime($attraction->api_id);
                Cache::forever("wait_time_{$attraction->id}", [
                    'data' => $waitTime,
                    'cached_at' => now()->toDateTimeString(),
                ]);
            }
        }
        $this->info('All wait times cached!');
    }
}
