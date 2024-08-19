<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Foods;

class FoodController extends Controller
{
    public function index()
    {
        return Foods::all();
    }
}
