<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // We call our new seeders in order.
        // UserSeeder MUST come first, as complaints and announcements
        // depend on users existing.
        $this->call([
            UserSeeder::class,
            ComplaintSeeder::class,
            AnnouncementSeeder::class,
        ]);
    }
}
