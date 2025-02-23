<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;

class AdminDashboardTest extends TestCase
{

    private User $admin;
    // use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role' => 'admin'
        ]);
    }

    private function createUser(): User
    {
        return User::factory()->create();
    }

    public function test_non_admin_user_cannot_access_admin_dashboard(): void
    {
        $response = $this->actingAs($this->createUser())->get("admin/dashboard");
        $response->assertRedirect('/dashboard');
    }

    public function test_admin_cannot_access_user_dashboard(): void
    {
        $response = $this->actingAs($this->admin)->get('/dashboard');
        $response->assertRedirect("admin/dashboard");
    }

    public function test_admin_dashboard_render(): void
    {
        $response = $this->actingAs($this->admin)->get("admin/dashboard");
        $response->assertStatus(200)->assertInertia(
            fn(Assert $page) =>
            $page->component('Auth/admin/Dashboard')
        );
    }

    public function test_admin_dashboard_renders_users_list(): void
    {

        $response = $this->actingAs($this->admin)->get('/admin/dashboard/users');
        $response->assertStatus(200)
            ->assertInertia(
                fn(Assert $page) =>
                $page->component('Auth/admin/Dashboard')
            );
    }
}
