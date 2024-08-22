<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memberorder;

class MemberorderController extends Controller
{
    public function memberOrder(Request $request)
    {
        $validatedData = $request->validate([
            'member_id'     => 'required|integer',
            'detail'        => 'required|json',
            'totalPrice'    => 'required|integer'
        ]);

        Memberorder::create($validatedData);

        return response()->json(['message' => 'Member order successfully!'], 201);
    }
}
