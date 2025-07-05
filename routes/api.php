<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WaitTimeController;

Route::middleware([
    'auth',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    Route::get('/wait-times', [WaitTimeController::class, 'index']);
});