<?php

namespace Database\Factories;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarModel>
 */
class CarModelFactory extends Factory
{
    protected $model = CarModel::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'car_make_id' => CarMake::factory(),
        ];
    }
}
