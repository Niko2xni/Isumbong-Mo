<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Complaint;

class ComplaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users who are *not* admins
        $users = User::where('role', 'user')->pluck('id');
        
        if ($users->isEmpty()) {
             $this->command->info('No regular users found to create complaints for. Skipping.');
             return;
        }

        // Create 40 "submitted" complaints
        Complaint::factory(40)->create([
            'user_id' => fn () => $users->random(),
        ]);

        // Create 10 "resolved" complaints
        // The 'resolved' state in the factory will automatically find an admin
        Complaint::factory(10)->resolved()->create([
            'user_id' => fn () => $users->random(),
        ]);
    }
}
