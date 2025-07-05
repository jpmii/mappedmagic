<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WaitTimeController;
use Illuminate\Http\Request;

Route::middleware([
    'auth',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    Route::get('/wait-times', [WaitTimeController::class, 'index']);
});

Route::middleware('auth')->get('/test-auth', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});