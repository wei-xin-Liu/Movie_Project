<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Theaters;

class Tickets extends Model
{
    use HasFactory;
    protected $table = 'tickets';

    public function theaters()
    {
        return $this->hasOne(Theaters::class, 'TID', 'theaters_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

   
    public function foods()
    {
        return $this->belongsToMany(Foods::class, 'ticket_food');
    }
}
