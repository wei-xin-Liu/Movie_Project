<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieInfoController;
use App\Http\Controllers\TicketsController;

use App\Http\Controllers\SeatController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MemberorderController;

use App\Http\Controllers\bluepay;

use App\Http\Controllers\Api\ApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/movieinfo', [MovieInfoController::class, 'getData']);
Route::get('/tickets', [TicketsController::class, 'getData']);

Route::get('/movies/{id}'       , [MovieController::class      ,  'show']);
Route::get('/movieTop'          , [MovieController::class      ,  'getTopMovies']);
Route::get('/foods'             , [FoodController::class       ,  'index']);

Route::post('/get-empty-seats', [SeatController::class, 'getEmptySeats']);
Route::post('/get-total-seats', [SeatController::class, 'getTotalSeats']);
Route::post('/get-ticket-prices', [TicketController::class, 'getTicketPrices']);
Route::post('/book-seat', [BookingController::class, 'bookSeat']);
Route::post('/member-order', [MemberorderController::class, 'memberOrder']);

Route::post('/bluepay', [bluepay::class, 'submitPayment']);
Route::post('/bluepaysuccessful', [bluepay::class, 'bluepaysuccessful']);
// Route::get('/getPaymentData', [bluepay::class, 'getPaymentData']);

# YK API ROUTE
Route::post('signup', [ApiController::class, 'signup']);
Route::post('login', [ApiController::class, 'login']);
// Protected Routes
Route::group(
    [
        'middleware' => ['auth:api'],
    ],
    function () {
        Route::get('info', [ApiController::class, 'info']);
        Route::post('refresh-token', [ApiController::class, 'refreshToken']);
        Route::get('logout', [ApiController::class, 'logout']);
        Route::put('update-info', [ApiController::class, 'updateInfo']);
        Route::delete('delete-account', [
            ApiController::class,
            'deleteAccount',
        ]); // New delete route
    }
);
