<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    public function getTicketPrices(Request $request)
    {
        $theaterName = $request->input('theaterName');

        $ticketPrices = DB::select('CALL GetTicketPrices(?)', [$theaterName]);

        return response()->json($ticketPrices);
    }
}
