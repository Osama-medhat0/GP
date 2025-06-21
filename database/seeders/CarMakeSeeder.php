<?php

namespace Database\Seeders;

use App\Models\CarMake;
use Illuminate\Database\Seeder;

class CarMakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $makes = [
            'Ford',
            'Hyundai',
            'Lexus',
            'INFINITI',
            'Audi',
            'Acura',
            'BMW',
            'Mercedes-Benz',
            'Toyota',
            'Honda',
            'Dodge',
            'Chevrolet',
            'Nissan',
            'Land Rover',
            'Porsche',
            'Tesla',
            'Lincoln',
            'Jaguar',
            'Genesis',
            'Kia',
            'Volvo',
            'Mazda',
            'Subaru',
            'Volkswagen',
            'Bentley',
            'Maserati',
            'Aston Martin',
            'Lamborghini',
            'Ferrari',
            'Rolls-Royce',
            'Alfa Romeo',
            'GMC',
            'Cadillac',
            'Chrysler',
            'Buick',
            'RAM',
            'FIAT',
            'Saturn',
            'Pontiac',
            'Saab',
            'Mercury',
            'Hummer',
            'McLaren',
            'Lotus',
            'Bugatti',
            'Karma',
            'Polestar',
            'Rivian',
            'Lucid',
            'MINI',
            'Jeep',
            'Mitsubishi',
            'Scion'
        ];

        foreach ($makes as $make) {
            CarMake::create(['name' => $make]);
        }
    }
}
