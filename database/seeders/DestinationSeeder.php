<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;

class DestinationSeeder extends Seeder
{
    public function run()
    {
        $destinations = [
            /* Disney */
            ['name' => 'Walt Disney World', 'short_name' => 'WDW', 'api_id' => 'e957da41-3552-4cf6-b636-5babc5cbc4e5', 'city' => 'Orlando', 'state' => 'FL', 'country' => 'USA'],
            ['name' => 'Disneyland Resort', 'short_name' => 'DLR', 'api_id' => 'bfc89fd6-314d-44b4-b89e-df1a89cf991e', 'city' => 'Anaheim', 'state' => 'CA', 'country' => 'USA'],
            ['name' => 'Disneyland Paris', 'short_name' => 'DLP', 'api_id' => 'e8d0207f-da8a-4048-bec8-117aa946b2c2', 'city' => 'Paris', 'state' => 'Île-de-France', 'country' => 'France'],
            ['name' => 'Tokyo Disney Resort', 'short_name' => 'TDR', 'api_id' => 'faff60df-c766-4470-8adb-dee78e813f42', 'city' => 'Tokyo', 'state' => '', 'country' => 'Japan'],
            ['name' => 'Shanghai Disney Resort', 'short_name' => 'SDR', 'api_id' => '6e1464ca-1e9b-49c3-8937-c5c6f6675057', 'city' => 'Shanghai', 'state' => '', 'country' => 'China'],
            ['name' => 'Hong Kong Disneyland Parks', 'short_name' => 'HKDL', 'api_id' => 'abcfffe7-01f2-4f92-ae61-5093346f5a68', 'city' => 'Lantau Island', 'state' => '', 'country' => 'Hong Kong'],
            /* Universal */
            ['name' => 'Universal Orlando Resort', 'short_name' => 'UOR', 'api_id' => '89db5d43-c434-4097-b71f-f6869f495a22', 'city' => 'Orlando', 'state' => 'FL', 'country' => 'USA'],
            ['name' => 'Universal Studios', 'short_name' => 'US', 'api_id' => '9fc68f1c-3f5e-4f09-89f2-aab2cf1a0741', 'city' => 'Anaheim', 'state' => 'CA', 'country' => 'USA'],
            ['name' => 'Universal Beijing Resort', 'short_name' => 'UBR', 'api_id' => '40ebecca-2221-4230-9814-6a00b3fbb558', 'city' => 'Beijing', 'state' => '', 'country' => 'China'],
            /* Local? */

        ];

        foreach ($destinations as $destination) {
            Destination::updateOrCreate(
                ['api_id' => $destination['api_id']],
                $destination);
        }
    }
}

