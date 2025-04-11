<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Database\Seeders\ParkSeeder;
use Database\Seeders\AttractionSeeder;

class SyncThemeParkData extends Command
{
    protected $signature = 'themepark:sync';

    protected $description = 'Sync parks and attractions from Themepark.wiki API';

    public function handle()
    {
        // Optionally call the seeders manually
        $this->call(ParkSeeder::class);
        $this->call(AttractionSeeder::class);

        $this->info('Theme park data synced successfully!');
    }
}

