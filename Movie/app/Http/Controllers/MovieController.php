<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movies;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    public function show($id)
    {
        // 取得電影及其關聯的 rating 資料
        $movie = Movies::with('rating')->find($id);

        if ($movie) {
            // 呼叫存儲過程獲取影廳和上映時間
            $theaterShowtimes = DB::select('CALL GetTheaterShowtimes(?)', [$id]);

            // 整理影廳及其對應的上映時間
            $theaters = [];
            foreach ($theaterShowtimes as $showtime) {
                $theaters[$showtime->theater_name][] = $showtime->time_point;
            }

            $movie->theaters = $theaters;

            return response()->json($movie);
        } else {
            return response()->json(['message' => 'Movie not found'], 404);
        }
    }

    public function getTopMovies()
    {
        // 限制返回 8 部電影
        $movies = Movies::with('rating')->limit(8)->get();

        return response()->json($movies);
    }
}
