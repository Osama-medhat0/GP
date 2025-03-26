<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function random()
    {
        // Create 10 random users
        User::factory(15)->create();
    }
    public function run(): void
    {
        DB::table('users')->insert([
            //User
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => Hash::make(123123123),
                'role' => 'user',
            ],
        ]);
    }
}
