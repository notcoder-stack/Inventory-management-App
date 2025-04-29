<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sell>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "productName" => fake()->name(),
            "quantity" => fake()->numberBetween(1, 100),
            "revenue" => fake()->numberBetween(100, 1000),
            "date" => fake()->date(),
        ];
    }
}
