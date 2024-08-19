<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MovieInfo;


class Rating extends Model
{
    use HasFactory;

    protected $table = 'rating';

    public function movieinfo()
    {
        return $this->hasMany(MovieInfo::class, 'ratingid', 'ratingid');
    }
}
