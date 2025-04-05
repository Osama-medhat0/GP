<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatMessagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chat_messages')->insert([
            [
                'sender_id' => 1,
                'receiver_id' => 2,
                'msg' => 'Hello, how are you?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sender_id' => 2,
                'receiver_id' => 1,
                'msg' => 'I am good! What about you?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sender_id' => 1,
                'receiver_id' => 2,
                'msg' => 'I am doing great!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
