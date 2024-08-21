<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookings;
use App\Models\Theaters;

class BookingController extends Controller
{
    public function bookSeat(Request $request)
    {
        $theaterName  = $request->input('theater');

        $theater = Theaters::where('name', $theaterName)->first();

        if (!$theater) {
            return response()->json(['message' => 'Theater not found'], 404);
        }

        $TID = $theater->TID;

        $request->merge(['TID' => $TID]);

        $validatedData = $request->validate([
            'member_id'     => 'required|integer',
            'seat_id'       => 'required|integer',
            'watch_time'    => 'required|string',
            'watch_date'    => 'required|date',
            'TID'           => 'required|integer'
        ]);

        // 檢查是否已經存在相同座位的預訂
        $existingBooking = Bookings::where([
            ['seat_id',    $validatedData['seat_id']],
            ['TID',        $validatedData['TID']],
            ['watch_time', $validatedData['watch_time']],
            ['watch_date', $validatedData['watch_date']],
        ])->first();

        if ($existingBooking) {
            return response()->json(['message' => 'This seat has already been booked for the selected showtime'], 409);
        }

        Bookings::create($validatedData);

        return response()->json(['message' => 'Seat booked successfully!'], 201);
    }
}
