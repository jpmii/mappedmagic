<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('auth')->get('/test-auth', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});