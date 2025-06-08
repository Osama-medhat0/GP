<?php

namespace Database\Seeders;

use App\Models\Cars;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Make sure there are users to assign as owners
        $users = User::where('id', '!=', 5)->get(); // exclude admin by id


        if ($users->isEmpty()) {
            $this->command->warn('No users found. Please seed users first.');
            return;
        }

        // foreach (range(1, 3) as $i) {
        //     Cars::create([
        //         'make' => 'Toyota',
        //         'model' => 'Corolla',
        //         'year' => rand(2022, 2024),
        //         'price' => rand(500000, 700000),
        //         'mileage' => rand(20000, 150000),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Manual',
        //         'location' => 'Alexandria',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             'car/toyota-corolla.jpg',
        //             'car/toyota-corolla-3.jpg',
        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "overpriced",  // or 'below', 'fair'
        //     ]);
        // }

        // foreach (range(1, 3) as $i) {
        //     Cars::create([
        //         'make' => 'Honda',
        //         'model' => 'Civic si',
        //         'year' => rand(2010, 2015),
        //         'price' => rand(700000, 800000),
        //         'mileage' => rand(30000, 150000),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Automatic',
        //         'location' => 'Mansoura',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             'car/honda-3.jpeg',

        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "overpriced",  // or 'below', 'fair'
        //     ]);
        // }
        // foreach (range(1, 3) as $i) {
        //     Cars::create([
        //         'make' => 'Mercedes-Benz',
        //         'model' => 'Amg c 63 s',
        //         'year' => rand(2020, 2025),
        //         'price' => rand(800000, 1000000),
        //         'mileage' => rand(300, 1500),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Automatic',
        //         'location' => 'Mansoura',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             'car/merc.jpeg',
        //             'car/merc-2.jpeg',

        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "overpriced",  // or 'below', 'fair'
        //     ]);
        // }

        // foreach (range(1, 3) as $i) {
        //     Cars::create([
        //         'make' => 'Kia',
        //         'model' => 'Ev6 gt-line',
        //         'year' => rand(2022, 2025),
        //         'price' => rand(800000, 1000000),
        //         'mileage' => rand(300, 1500),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Automatic',
        //         'location' => 'Mansoura',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             'car/kia.jpeg',
        //             'car/kia-2.jpeg',

        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "overpriced",  // or 'below', 'fair'
        //     ]);
        // }


        // foreach (range(1, 3) as $i) {
        //     Cars::create([
        //         'make' => 'Volvo',
        //         'model' => 'S90 t5 momentum',
        //         'year' => rand(2022, 2025),
        //         'price' => rand(700000, 900000),
        //         'mileage' => rand(300, 100),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Automatic',
        //         'location' => 'Mansoura',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             '/car/volvo.jpeg',
        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "overpriced",  // or 'below', 'fair'
        //     ]);
        // }
        // foreach (range(1, 2) as $i) {
        //     Cars::create([
        //         'make' => 'Lexus',
        //         'model' => 'Lx 600 premium',
        //         'year' => rand(2022, 2025),
        //         'price' => rand(700000, 900000),
        //         'mileage' => rand(300, 100),
        //         'fuelType' => 'Petrol',
        //         'transmission' => 'Automatic',
        //         'location' => 'Mansoura',
        //         'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
        //         'images' => json_encode([
        //             '/car/lexus.jpeg',
        //             '/car/lexus-2.jpeg',

        //         ]),

        //         'user_id' => $users->random()->id,
        //         'price_status' => "fair",  // or 'below', 'fair'
        //     ]);
        // }

        foreach (range(1, 2) as $i) {
            Cars::create([
                'make' => 'Ford',
                'model' => 'F-150 xlt',
                'year' => rand(2011, 2022),
                'price' => rand(700000, 900000),
                'mileage' => rand(300, 100),
                'fuelType' => 'Petrol',
                'transmission' => 'Automatic',
                'location' => 'Mansoura',
                'description' => 'This is a reliable and fuel-efficient car, perfect for daily commuting and long drives. It has been well-maintained and is in excellent condition.',
                'images' => json_encode([
                    '/car/ford.jpeg',
                    '/car/ford-2.jpeg',

                ]),

                'user_id' => $users->random()->id,
                'price_status' => "fair",  // or 'below', 'fair'
            ]);
        }
    }
}
