<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MemberOrder;
use App\Models\Users;

class OrderDetail extends Controller
{
    public function getUserOrders()
    {
        // Get the ID of the authenticated user
        $userId = Auth::id();

        // Fetch orders for the authenticated user
        $orders = MemberOrder::where('user_id', $userId)->get();

        return response()->json($orders);
    }
}
