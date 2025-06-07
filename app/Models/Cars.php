<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cars extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'fuelType',
        'transmission',
        'location',
        'description',
        'images',
        'user_id',
        'price_status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
