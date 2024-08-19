<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tickets;
use App\Models\Theaters;


class TicketsController extends Controller
{
    public function getData()
    {
        $ticket = Tickets::with('theaters')->get();
        return response()->json($ticket);
    }
}
