<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'MID';

    public function rating()
    {
        return $this->belongsTo(Rating::class, 'ratingid', 'ratingid');
    }
}
