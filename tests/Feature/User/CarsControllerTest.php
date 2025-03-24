<?php

namespace Tests\Feature;

use App\Models\Cars;
use App\Models\CarMake;
use App\Models\CarModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CarsControllerTest extends TestCase
{
    // use RefreshDatabase;

    public function test_paginated_cars_displays()
    {

        Cars::factory(5)->create();
        $response = $this->get(route("car.page"));
        $response->assertStatus(200)->assertInertia(fn($page) => $page->component("Frontend/CarsPage")->has('cars.data', 5));
    }


    public function test_user_can_create_a_car_listing()
    {
        $user = User::factory()->create();
        $make = CarMake::factory()->create();
        $model = CarModel::factory()->create();

        // Fake storage
        Storage::fake('public');

        $image = UploadedFile::fake()->image('car1.jpg');

        $response = $this->actingAs($user)->post(route("car.store"), [
            'make' => $make->name,
            'model' => $model->name,
            'year' => 2022,
            'price' => 25000,
            'mileage' => 50000,
            'fuelType' => 'Petrol',
            'transmission' => 'Automatic',
            'location' => 'New York',
            'description' => 'Test car listing',
            'images' => [$image],
        ]);

        $response->assertRedirect(route("car.listing"))->assertSessionHas('message', 'Car added successfully.');

        $this->assertDatabaseHas('cars', ['model' => $model->name, "make" => $make->name, 'year' => 2022]);

        $this->assertTrue(Storage::disk('public')->exists("car/{$image->hashName()}"));
    }

    // public function test_car_make_and_model_data_listing_form()
    // {
    //     $user = User::factory()->create();
    //     $make = CarMake::factory(10)->create();
    //     $model = CarModel::factory(10)->create();

    //     $response = $this->actingAs($user)->get(route("car.listing"));
    //     dd($response->status(), $response->headers->get('content-type'), $response->content());
    //     // $response->assertStatus(200);
    //     $response->assertInertia(fn($page) => $page->component("User/CarListingForm")->has('carMakes', 10)->has('carModels', 10));
    // }

    public function test_user_can_add_car_list()
    {
        $user = User::factory()->create();
        $model = CarModel::factory()->create();
        $make = CarMake::factory()->create();

        // Fake storage
        Storage::fake('public');

        $image = UploadedFile::fake()->image('car1.jpg');

        $response = $this->actingAs($user)->post(route("car.store"), [
            'make' => $make->name,
            'model' => $model->name,
            'year' => 2021,
            'price' => 20000,
            'mileage' => 30000,
            'fuelType' => 'Electric',
            'transmission' => 'Automatic',
            'location' => 'San Francisco',
            'description' => 'New car listing',
            'images' => [$image]
        ]);

        $response->assertRedirect(route("car.listing"))->assertSessionHas("message", "Car added successfully.");
        $this->assertDatabaseHas('cars', ['make' => $make->name, 'year' => 2021]);
        $this->assertTrue(Storage::disk('public')->exists("car/{$image->hashName()}"));
    }


    public function test_user_can_update_car_listing()
    {
        $user = User::factory()->create();
        $car = Cars::factory()->for($user)->create();
        $make = CarMake::factory()->create();
        $model = CarModel::factory()->create();

        // Fake storage
        Storage::fake('public');

        $image = UploadedFile::fake()->image('car2.jpg');

        $response = $this->actingAs($user)->put(route("car.update", $car), [
            'id' => $car->id,
            'make' => $make->name,
            'model' => $model->name,
            'year' => 2023,
            'price' => 30000,
            'mileage' => 40000,
            'fuelType' => 'Diesel',
            'transmission' => 'Manual',
            'location' => 'Los Angeles',
            'description' => 'Updated car listing',
            'images' => [$image],
        ]);

        $response->assertRedirect(route("car.edit.form"))->assertSessionHas('message', 'Car updated successfully.');
        $this->assertDatabaseHas('cars', ['id' => $car->id, 'model' => $model->name, "make" => $make->name, 'year' => 2023]);
        $this->assertTrue(Storage::disk('public')->exists("car/{$image->hashName()}"));
    }

    public function test_user_can_delete_car_listing()
    {
        $user = User::factory()->create();
        $car = Cars::factory()->for($user)->create();

        $response = $this->actingAs($user)->delete(route("car.delete", $car->id));

        $response->assertStatus(200);

        $this->assertDatabaseMissing('cars', ['id' => $car->id]);
    }
}
