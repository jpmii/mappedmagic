<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Destination;
use App\Models\Park;

class ParkSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = Destination::all();

        $api_call = Http::get("https://api.themeparks.wiki/v1/destinations");

        if ($api_call->successful()) {
            $data = $api_call->json();
            $destinationsById = collect($data['destinations'])->keyBy('id')->toArray();

            foreach ($destinations as $destination) {
                    foreach ($destinationsById[$destination->api_id]['parks'] as $park) {

                        Park::updateOrCreate(
                            ['api_id' => $park['id']],
                            [
                                'destination_id' => $destination->id,
                                'name' => $park['name'],
                                'api_id' => $park['id'],
                            ]
                        );
                    }
                    //Create Default?
                    Park::updateOrCreate(
                        ['api_id' => $destination->api_id],
                        [
                            'destination_id' => $destination->id,
                            'name' => 'Other',
                            'api_id' => $destination->api_id,
                        ]
                    );    
            }
            } else {
                logger()->error("Failed to fetch destinations");
            }
    }
}
