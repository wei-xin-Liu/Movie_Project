<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'seat_id',
        'watch_time',
        'watch_date',
        'TID'
    ];

    public $timestamps = false;
}
