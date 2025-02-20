<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([

            //Admin
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make(123123123),
                'role' => 'admin',
            ],
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
