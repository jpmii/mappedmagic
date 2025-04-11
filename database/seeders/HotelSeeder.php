<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    public function run()
    {
        $hotels = [
            // Walt Disney World Hotels (Florida)
            ['destination_id' => 1, 'name' => 'Disney\'s Contemporary Resort', 'short_name' => 'Contemporary', 'dvc' => false, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4147, 'longitude' => -81.5746],
            ['destination_id' => 1, 'name' => 'Bay Lake Tower at Disney\'s Contemporary Resort', 'short_name' => 'Bay Lake Tower', 'dvc' => true, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4166, 'longitude' => -81.5736],
            ['destination_id' => 1, 'name' => 'Disney\'s Grand Floridian Resort & Spa', 'short_name' => 'Grand Floridian', 'dvc' => false, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4159, 'longitude' => -81.5894],
            ['destination_id' => 1, 'name' => 'The Villas at Disney\'s Grand Floridian Resort & Spa', 'short_name' => 'Grand Floridian Villas', 'dvc' => true, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4063, 'longitude' => -81.5870],
            ['destination_id' => 1, 'name' => 'Disney\'s Polynesian Village Resort', 'short_name' => 'Polynesian', 'dvc' => false, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4037, 'longitude' => -81.5769],
            ['destination_id' => 1, 'name' => 'Disney\'s Polynesian Villas & Bungalows', 'short_name' => 'Polynesian Villas', 'dvc' => true, 'transportation' => 'Monorail, Bus', 'latitude' => 28.4067, 'longitude' => -81.5782],
            ['destination_id' => 1, 'name' => 'Disney\'s Animal Kingdom Lodge', 'short_name' => 'Animal Kingdom Lodge', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.3565, 'longitude' => -81.6031],
            ['destination_id' => 1, 'name' => 'Disney\'s Animal Kingdom Lodge - Kidani Village', 'short_name' => 'Animal Kingdom Lodge - Kidani', 'dvc' => true, 'transportation' => 'Bus', 'latitude' => 28.3541, 'longitude' => -81.6076],
            ['destination_id' => 1, 'name' => 'Disney\'s Beach Club Resort', 'short_name' => 'Beach Club', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3705, 'longitude' => -81.5560],
            ['destination_id' => 1, 'name' => 'Disney\'s Beach Club Villas', 'short_name' => 'Beach Club Villas', 'dvc' => true, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3706, 'longitude' => -81.5567],
            ['destination_id' => 1, 'name' => 'Disney\'s Yacht Club Resort', 'short_name' => 'Yacht Club', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.37001, 'longitude' => -81.55816],
            ['destination_id' => 1, 'name' => 'Disney\'s BoardWalk Inn', 'short_name' => 'BoardWalk', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3706, 'longitude' => -81.5535],
            ['destination_id' => 1, 'name' => 'Disney\'s BoardWalk Villas', 'short_name' => 'BoardWalk Villas', 'dvc' => true, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3666, 'longitude' => -81.5556],
            ['destination_id' => 1, 'name' => 'Disney\'s Wilderness Lodge', 'short_name' => 'Wilderness Lodge', 'dvc' => false, 'transportation' => 'Boat, Bus', 'latitude' => 28.4034, 'longitude' => -81.5738],
            ['destination_id' => 1, 'name' => 'Boulder Ridge Villas at Disney\'s Wilderness Lodge', 'short_name' => 'Boulder Ridge', 'dvc' => true, 'transportation' => 'Boat, Bus', 'latitude' => 28.4035, 'longitude' => -81.5656], 
            ['destination_id' => 1, 'name' => 'Copper Creek Villas & Cabins at Disney\'s Wilderness Lodge', 'short_name' => 'Copper Creek', 'dvc' => true, 'transportation' => 'Boat, Bus', 'latitude' => 28.4031, 'longitude' => -81.5652], 
            ['destination_id' => 1, 'name' => 'Disney\'s Saratoga Springs Resort & Spa', 'short_name' => 'Saratoga Springs', 'dvc' => true, 'transportation' => 'Bus', 'latitude' => 28.3712, 'longitude' => -81.5204],
            ['destination_id' => 1, 'name' => 'Disney\'s Old Key West Resort', 'short_name' => 'Old Key West', 'dvc' => true, 'transportation' => 'Bus', 'latitude' => 28.3717, 'longitude' => -81.5443],
            ['destination_id' => 1, 'name' => 'Disney\'s Riviera Resort', 'short_name' => 'Riviera Resort', 'dvc' => true, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3724, 'longitude' => -81.5416],
            ['destination_id' => 1, 'name' => 'Disney\'s Art of Animation Resort', 'short_name' => 'Art of Animation', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3514, 'longitude' => -81.5455],
            ['destination_id' => 1, 'name' => 'Disney\'s Pop Century Resort', 'short_name' => 'Pop Century', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3575, 'longitude' => -81.5451],
            ['destination_id' => 1, 'name' => 'Disney\'s Caribbean Beach Resort', 'short_name' => 'Caribbean Beach', 'dvc' => false, 'transportation' => 'Skyliner, Bus', 'latitude' => 28.3614, 'longitude' => -81.5560],
            ['destination_id' => 1, 'name' => 'Disney\'s Coronado Springs Resort', 'short_name' => 'Coronado Springs', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.3575, 'longitude' => -81.5596],
            ['destination_id' => 1, 'name' => 'Disney\'s All-Star Movies Resort', 'short_name' => 'All-Star Movies', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.3356, 'longitude' => -81.5696],
            ['destination_id' => 1, 'name' => 'Disney\'s All-Star Music Resort', 'short_name' => 'All-Star Music', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.3319, 'longitude' => -81.5696],
            ['destination_id' => 1, 'name' => 'Disney\'s All-Star Sports Resort', 'short_name' => 'All-Star Sports', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.3327, 'longitude' => -81.5766],
            // Disneyland Hotels (California)
            ['destination_id' => 2, 'name' => 'Disneyland Hotel', 'short_name' => 'Disneyland Hotel', 'dvc' => false, 'transportation' => 'Monorail, Bus', 'latitude' => 33.8111, 'longitude' => -117.9220],
            ['destination_id' => 2, 'name' => 'The Villas at Disneyland Hotel', 'short_name' => 'Villas at Disneyland Hotel', 'dvc' => true, 'transportation' => 'Monorail, Bus', 'latitude' => 33.8091, 'longitude' => -117.9247],
            ['destination_id' => 2, 'name' => 'Disney\'s Grand Californian Hotel & Spa', 'short_name' => 'Grand Californian', 'api_id' => 'disney_grand_californian', 'dvc' => false, 'transportation' => 'Monorail, Bus', 'latitude' => 33.8050, 'longitude' => -117.9237],
            ['destination_id' => 2, 'name' => 'The Villas at Disney\'s Grand Californian Hotel & Spa', 'short_name' => 'Villas at Grand Californian', 'api_id' => 'disney_grand_californian', 'dvc' => true, 'transportation' => 'Monorail, Bus', 'latitude' => 33.8055, 'longitude' => -117.9237],

            

            // Universal Orlando Hotels (Florida)
            ['destination_id' => 3, 'name' => 'Universal\'s Hard Rock Hotel', 'short_name' => 'Hard Rock', 'api_id' => 'universal_hard_rock', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.4800, 'longitude' => -81.4633],
            ['destination_id' => 3, 'name' => 'Universal\'s Cabana Bay Beach Resort', 'short_name' => 'Cabana Bay', 'api_id' => 'universal_cabana_bay', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.4722, 'longitude' => -81.4672],
            ['destination_id' => 3, 'name' => 'Loews Royal Pacific Resort', 'short_name' => 'Royal Pacific', 'api_id' => 'universal_royal_pacific', 'dvc' => false, 'transportation' => 'Bus', 'latitude' => 28.4695, 'longitude' => -81.4636],
        ];

        foreach ($hotels as $hotel) {
            Hotel::updateOrCreate(['api_id' => Str::slug($hotel['short_name'], '_')],
            [
                'destination_id' => $hotel['destination_id'],
                'name' => $hotel['name'],
                'short_name' => $hotel['short_name'],
                'api_id' => Str::slug($hotel['short_name'], '_'),
                'dvc' => $hotel['dvc'],
                'transportation' => $hotel['transportation'],
                'pool_open' => '10:00:00',
                'pool_close' => '22:00:00',
                'latitude' => $hotel['latitude'],
                'longitude' => $hotel['longitude'],
            ]);
        }
    }
}
