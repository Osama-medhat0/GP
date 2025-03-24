<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CarMake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarMake>
 */
class CarMakeFactory extends Factory
{
    protected $model = CarMake::class;
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->company,
        ];
    }
}
