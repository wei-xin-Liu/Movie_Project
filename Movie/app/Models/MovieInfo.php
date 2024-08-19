<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rating;

class MovieInfo extends Model
{
    use HasFactory;
    protected $table = 'movies';

    public function rating()
    {
        return $this->belongsTo(Rating::class, 'ratingid', 'ratingid');
    }
}
