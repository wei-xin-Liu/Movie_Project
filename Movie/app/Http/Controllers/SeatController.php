<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Seats;
use App\Models\Theaters;

class SeatController extends Controller
{
    private function getTIDByTheaterName($theaterName)
    {
        $theater = Theaters::where('name', $theaterName)->first();

        if (!$theater) {
            return null;
        }

        return $theater->TID;
    }

    public function getEmptySeats(Request $request)
    {
        $showDate    = $request->input('show_date');
        $showTime    = $request->input('show_time');
        $theaterName = $request->input('theater');

        $TID = $this->getTIDByTheaterName($theaterName);

        if (!$TID) {
            return response()->json(['message' => 'Theater not found'], 404);
        }

        $emptySeats = DB::select('CALL GetEmptySeats(?, ?, ?)', [$showDate, $showTime, $TID]);

        return response()->json($emptySeats);
    }

    public function getTotalSeats(Request $request)
    {
        $theaterName = $request->input('theater');

        $TID = $this->getTIDByTheaterName($theaterName);

        if (!$TID) {
            return response()->json(['message' => 'Theater not found'], 404);
        }

        $totalSeats = Seats::where('TID', $TID)->count();

        return response()->json(['total_seats' => $totalSeats]);
    }
}
