<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MovieInfo;
use App\Models\Rating;

class MovieInfoController extends Controller
{
    public function getData()
    {
        $movie = MovieInfo::with('rating')->get();
        return response()->json($movie);
    }
}
