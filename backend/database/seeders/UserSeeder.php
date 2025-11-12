<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create one specific Admin User for testing
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'address' => '123 Admin Street, Admin City',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // 2. Create a specific regular user for testing
        User::create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'user@example.com',
            'address' => '456 Test Avenue, Test Town',
            'password' => Hash::make('password'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        // 3. Create 20 additional random users
        User::factory(20)->create();
    }
}
