<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\CarMake;
use App\Models\CarModel;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ManageCarsTest extends TestCase
{
    private User $admin;
    use RefreshDatabase;
    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_add_new_car_make_in_database()
    {


        $response = $this->actingAs($this->admin)->post('/admin/manager/make', [
            'name' => 'Toyota',
        ]);

        $response->assertRedirect(route('manager.index'));

        $this->assertDatabaseHas('car_makes', [
            'name' => 'Toyota'
        ]);
    }

    public function test_duplicate_car_make_fails()
    {
        CarMake::create(['name' => 'Toyota']);

        $response = $this->actingAs($this->admin)->post('/admin/manager/make', ['name' => 'Toyota']);

        $response->assertSessionHasErrors(['name']);
        $this->assertEquals(1, CarMake::where('name', 'Toyota')->count());
    }

    public function test_empty_car_make_fails()
    {
        $response = $this->actingAs($this->admin)->post('/admin/manager/make', ['name', '']);
        $response->assertSessionHasErrors(['name']);
    }

    public function test_add_new_car_model_in_database()
    {
        $carMake = CarMake::create(['name' => 'Toyota']);

        $response = $this->actingAs($this->admin)->post("/admin/manager/model", ['name' => "Corolla", "make_name" => $carMake->name]);
        $response->assertRedirect(route("manager.index"));

        $this->assertDatabaseHas('car_models', ['name' => 'Corolla', 'car_make_id' => $carMake->id]);
    }

    public function test_it_returns_makes_and_models_with_pagination()
    {
        CarMake::factory()->count(15)->create()->each(function ($make) {
            CarModel::factory()->count(2)->create(['car_make_id' => $make->id]);
        });

        $response = $this->actingAs($this->admin)->get("admin/manager");
        $response->assertInertia(fn(Assert $page) => $page->component("Admin/CarManager")->has("makes.data", 5)->has("models.data", 5));
    }
}
