<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    public function getTicketPrices(Request $request)
    {try {
        $theaterName = $request->input('theaterName');

        $ticketPrices = DB::select('CALL GetTicketPrices(?)', [$theaterName]);

        return response()->json($ticketPrices);
    } catch (\Exception $e) {
        \Log::error('Error fetching ticket prices: ' . $e->getMessage());
        return response()->json(['error' => 'An error occurred'], 500);
    }
    }
}
