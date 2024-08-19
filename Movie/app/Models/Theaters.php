<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tickets;


class Theaters extends Model
{
    use HasFactory;
    protected $table = 'theaters';

    public function tickets()
    {
        return $this->belongsTo(Tickets::class, 'theaters_id', 'TID');
    }
}
