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

        $response = $this->actingAs($user)->post(route("car.update", $car), [
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

    public function test_user_can_access_car_edit_form()
    {

        $user = User::factory()->create();
        $model = CarModel::factory()->create();
        $make = CarMake::factory()->create();

        $image = UploadedFile::fake()->image('car1.jpg')->store('car', 'public');
        $car = Cars::factory()->for($user)->create([
            'make' => $make->name,
            'model' => $model->name,
            'images' => json_encode([$image]),
        ]);

        $response = $this->actingAs($user)->get(route('car.edit.form'));
        $response->assertStatus(200);

        $response->assertInertia(fn($page) => $page->component('User/CarEditForm')->has('car', 1)->where('car.0.id', $car->id)->where('car.0.make', $car->make)->where('car.0.model', $car->model)->where('car.0.image_urls.0', asset("storage/{$image}")));
    }

    public function test_authenticated_user_can_view_their_cars()
    {

        $user = User::factory()->create();

        $image = UploadedFile::fake()->image('car1.jpg')->store('car', 'public');

        $car = Cars::factory()->for($user)->create(['images' => json_encode([$image])]);

        $response = $this->actingAs($user)->get(route('car.edit'));
        $response->assertStatus(200);

        $response->assertInertia(fn($page) => $page->component('User/UserCarsPage')->has('cars', 1)->where('cars.0.id', $car->id)->where('cars.0.image_urls.0', asset("storage/{$image}")));
    }

    public function test_returns_empty_cars_list_if_user_has_no_cars()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('car.edit'));

        $response->assertInertia(
            fn($page) =>
            $page
                ->component('User/UserCarsPage')
                ->has('cars', 0)
        );
    }

    public function test_delete_car_list()
    {
        $user = User::factory()->create();
        $model = CarModel::factory()->create();
        $make = CarMake::factory()->create();

        $car = Cars::factory()->for($user)->create(['make' => $make->name, 'model' => $model->name]);

        $response = $this->actingAs($user)->delete(route('car.delete', $car->id));

        //Assert car is deleted
        $this->assertDatabaseMissing('cars', ['id' => $car->id]);

        $response->assertRedirect(route('car.edit'));
    }
}
