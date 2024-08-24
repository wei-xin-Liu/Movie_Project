<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => bcrypt(Str::random(16)),
                    'google_id' => $googleUser->id, // Maybe error because there isn't google id
                ]);
            }

            // Log the user in
            Auth::login($user);

            // Generate a JWT token
            $token = JWTAuth::fromUser($user);

            // Prepare the redirect URL with tokens
            $redirectUrl =
                'http://localhost:5173/auth-callback?' .
                http_build_query([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'user' => $user,
                    'expires_in' => auth()->factory()->getTTL() * 60,
                ]);

            return redirect()->away($redirectUrl);
        } catch (\Exception $e) {
            // Handle exception
            return redirect()->away('http://localhost:5173/auth-error');
        }
    }
}
