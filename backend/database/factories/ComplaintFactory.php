<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complaint>
 */
class ComplaintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'subject' => fake()->sentence(6),
            'description' => fake()->paragraph(3),
            'type' => fake()->randomElement(['Bug Report', 'Feedback', 'Billing Issue', 'Other']),
            'status' => 'submitted',
            'remarks' => null,
            'admin_id' => null,
        ];
    }

    /**
     * A state for creating a "resolved" complaint.
     */
    public function resolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'resolved',
            'remarks' => fake()->paragraph(2),
            'admin_id' => User::where('role', 'admin')->inRandomOrder()->first()?->id ?? User::factory(['role' => 'admin']),
        ]);
    }
}
