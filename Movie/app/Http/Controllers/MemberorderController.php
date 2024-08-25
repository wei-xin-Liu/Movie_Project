<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memberorder;
use Tymon\JWTAuth\Facades\JWTAuth;

class MemberorderController extends Controller
{
    public function memberOrder(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'detail' => 'required|json',
                'totalPrice' => 'required|integer',
            ]);
            // $validatedData['user_id'] = auth()->id(); // Get the authenticated user's ID
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $validatedData['user_id'] = $user->id;

            Memberorder::create($validatedData);

            return response()->json(
                ['message' => 'Member order created successfully!'],
                201
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(
                [
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ],
                422
            );
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' =>
                        'An error occurred while processing your request',
                    'error' => $e->getMessage(),
                ],
                500
            );
        }
    }
}
