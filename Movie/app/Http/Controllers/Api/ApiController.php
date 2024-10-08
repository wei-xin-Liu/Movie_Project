<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
//use PhpOpenSourceSaver\JwtAuth\Facades\JwtAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\Http\Requests\LogInRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Services\BarcodeService;

class ApiController extends Controller
{
    public function login(LogInRequest $request)
    {
        $credentials = $request->validated();

        // Attempt to authenticate the user
        if (!($token = JWTAuth::attempt($credentials))) {
            return response()->json(
                [
                    'status' => false,
                    'message' => '無效的電子郵件或密碼。請再試一次',
                ],
                422
            );
        }

        // Get the authenticated user
        $user = JWTAuth::user();
        $token = JWTAuth::fromUser($user);
        $membershipPoint = $user->getTotalRewardPoints();
        $membershipLevel = $user->getMembershipLevel();
        // return response(compact('user', 'token'));
        return response([
            'status' => true,
            'message' => '會員登入成功',

            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                // 'user' => $user,
                'token' => $token,
                'membership_point' => $membershipPoint,
                'membership_level' => $membershipLevel,
            ],
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
    protected $barcodeService;

    public function __construct(BarcodeService $barcodeService)
    {
        $this->barcodeService = $barcodeService;
    }
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = JWTAuth::fromUser($user);
        $membershipPoint = $user->getTotalRewardPoints();
        $membershipLevel = $user->getMembershipLevel();

        $this->barcodeService->generateForUser($user);

        return response()->json([
            'status' => true,
            'message' => '會員註冊成功',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
            'membership_point' => $membershipPoint,
            'membership_level' => $membershipLevel,
        ]);
    }
    // Logout API - GET (JWT Auth Token)
    public function logout()
    {
        auth()->logout();

        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'status' => true,
                'message' => '登出成功',
            ]);
        } catch (JWTException $e) {
            return response()->json(
                [
                    'status' => false,
                    'message' => '登出失敗',
                ],
                500
            );
        }
    }

    public function info()
    {
        try {
            // Get the currently authenticated user
            $user = JWTAuth::user();
            if (!$user) {
                return response()->json(
                    ['status' => false, 'message' => 'User not authenticated'],
                    401
                );
            }

            $token = JWTAuth::fromUser($user);
            $membershipLevel = $user->getMembershipLevel();

            // Generate the Base64-encoded URL for the barcode image
            // Handle barcode image encoding
            $barcodeImageBase64 = $user->getBarcodeImageUrlAttribute();

            return response()->json([
                'status' => true,
                'message' => 'Profile data',
                'user' => $user,
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'token' => $token,
                'membership_level' => $membershipLevel,
                'barcode_path' => url('storage/' . $user->barcode_path),
                'barcode_id' => $user->barcode_id,
                'barcode_src' => $barcodeImageBase64
                    ? $barcodeImageBase64
                    : null,
            ]);
        } catch (\Exception $e) {
            // Return a detailed error message
            \Log::error('Error in info method: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
            return response()->json(
                [
                    'status' => false,
                    'message' => 'An error occurred',
                    'error' => $e->getMessage(), // Include the error message for debugging
                ],
                500
            );
        }
    }
    public function refreshToken()
    {
        try {
            $token = JWTAuth::parseToken()->refresh();

            return response()->json([
                'status' => true,
                'message' => 'Token refreshed successfully',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
            ]);
        } catch (JWTException $e) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Could not refresh token',
                ],
                401
            );
        }
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $data = $request->validated();

        $user = auth()->user(); // Fetch the authenticated user

        // Update fields if provided
        if (isset($data['name'])) {
            $user->name = $data['name'];
        }
        if (isset($data['email'])) {
            $user->email = $data['email'];
        }
        if (isset($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        $user->save(); // Save changes
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => true,
            'message' => 'User information updated successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function deleteAccount(Request $request)
    {
        $user = Auth::user(); // This works with JWT

        // Perform the delete operation
        if ($user) {
            if ($user->delete()) {
                return response()->json([
                    'status' => true,
                    'message' => 'Account deleted successfully.',
                ]);
            } else {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Failed to delete account.',
                    ],
                    500
                );
            }
        } else {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'User not found.',
                ],
                404
            );
        }
    }

    public function getTotalPoints()
    {
        $user = auth()->user();
        return response()->json([
            'total_points' => $user->getTotalRewardPoints(),
        ]);
    }

    // public function me()
    // {
    //     // // Get the authenticated user from the token
    //     // $user = JWTAuth::parseToken()->authenticate();

    //     // return response()->json(compact('user'));
    //     return response()->json(Auth::guard('api')->user());
    // }
}
