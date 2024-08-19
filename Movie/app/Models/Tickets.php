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
        return $this->hasone(Theaters::class, 'TID', 'theaters_id');
    }
}
