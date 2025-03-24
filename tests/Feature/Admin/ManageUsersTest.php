<?php

namespace Tests\Feature;

use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;


class ManageUsersTest extends TestCase
{
    private User $admin;

    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role' => 'admin'
        ]);
    }

    public function test_renders_users_list(): void
    {
        $users = User::factory()->count(5)->create();

        $response = $this->actingAs($this->admin)->get("/admin/dashboard/users");

        $response->assertInertia(
            fn(Assert $page) =>
            $page->component('Admin/UsersTable')
                ->has('users.data', 5)
                ->where(
                    'users.data',
                    fn($users) =>
                    collect($users)->pluck('id')->diff($users->pluck('id'))->isEmpty()
                )
        );
    }

    public function test_delete_users_from_list(): void
    {
        $users = User::factory()->count(5)->create();
        $userToDelete = $users->first();

        $response = $this->actingAs($this->admin)->delete("/admin/dashboard/users/{$userToDelete->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('users', ['id' => $userToDelete->id]);
    }
}
