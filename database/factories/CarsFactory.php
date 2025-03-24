<?php

namespace Database\Factories;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Cars;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cars>
 */
class CarsFactory extends Factory
{
    protected $model = Cars::class;
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'make' => CarMake::factory()->create()->name,
            'model' => CarModel::factory()->create()->name,
            'year' => $this->faker->numberBetween(1990, 2025),
            'price' => $this->faker->numberBetween(10000, 1000000),
            'mileage' => $this->faker->numberBetween(0, 200000),
            'fuelType' => $this->faker->randomElement(['Petrol', 'Diesel', "Electric", "Hybrid"]),
            'transmission' => $this->faker->randomElement(['Automatic', 'Manual']),
            'location' => $this->faker->city,
            'description' => $this->faker->sentence(10),
            'images' => json_encode([$this->faker->imageUrl(640, 480, 'cars')]),
        ];
    }
}
