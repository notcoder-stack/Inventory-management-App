<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Supplier;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@exemple.com',
            'password' => bcrypt('34981Z23'),
            'email_verified_at' => time(),
        ]);

        Employee::factory(10)->create();
        Product::factory(10)->create();
        Sale::factory(10)->create();
        Supplier::factory(10)->create();
    }
}
