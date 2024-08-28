<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memberorder extends Model
{
    use HasFactory;

    protected $table = 'memberorder';

    protected $fillable = ['oid','detail', 'totalPrice', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public $timestamps = false;
}
