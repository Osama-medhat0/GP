<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{

    use HasFactory;
    protected $guarded = [];
    // Define the sender relationship
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id');
    }

    // Define the receiver relationship
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id');
    }
}
