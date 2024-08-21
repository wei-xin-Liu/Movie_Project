<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memberorder extends Model
{
    use HasFactory;

    protected $table = 'memberorder';

    protected $fillable = [
        'member_id',
        'detail'
    ];

    public $timestamps = false;
}
