<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Attraction;
use App\Models\Destination;
use App\Models\Park;
use Illuminate\Support\Facades\Log;

class AttractionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinations = Destination::all();
        $parksById = collect(Park::all())->keyBy('api_id')->toArray();


        foreach ($destinations as $destination) {
            $response = Http::get("https://api.themeparks.wiki/v1/entity/{$destination->api_id}/children");
        
            if ($response->successful()) {
                $attractions = $response->json()['children'] ?? [];
        
                foreach ($attractions as $attr) {
                    // Only process rides/attractions
                    if (isset($attr['entityType']) && $attr['entityType'] !== 'PARK' && $attr['entityType'] !== 'HOTEL' && $attr['entityType'] !== 'DESTINATION') {
                        $parkid = ($parksById[$attr['parentId']])? $parksById[$attr['parentId']]['id']:0;
                        
                        if(!empty($attr['id']) && !empty($attr['name'])
                        && !isset($attr['location']['latitude'], $attr['location']['longitude'])
                        && !is_numeric($attr['location']['latitude'])
                        && !is_numeric($attr['location']['longitude'])){
                            Attraction::updateOrCreate(
                                ['api_id' => $attr['id']],
                                [
                                    'park_id' => $parkid,
                                    'name' => $attr['name'],
                                    'api_id' => $attr['id'],
                                    'type' => $attr['entityType'],
                                    'height_requirement' => 0, // Update if available
                                    'fast_pass_available' => $attr['queue'] ?? false,
                                    'latitude' => $attr['location']['latitude'] ?? 0,
                                    'longitude' => $attr['location']['longitude'] ?? 0,
                                ]
                            );
                        }else{
                            Log::warning("Skipped Attraction with missing data", $attr);
                        }
                    }
                }
            } else {
                logger()->error("Failed to fetch attractions for park: {$destination->name}");
            }
        }
        
    }
}
