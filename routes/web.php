<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TripController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/trips', [TripController::class, 'index'])->name('trips.index'); // List trips
    Route::get('/trips/create', [TripController::class, 'create'])->name('trips.create'); // Create trip form
    Route::post('/trips', [TripController::class, 'store'])->name('trips.store'); // Save new trip
    Route::get('/trips/{trip}', [TripController::class, 'show'])->name('trips.show'); // View trip details
    Route::get('/trips/{trip}/edit', [TripController::class, 'edit'])->name('trips.edit'); // Edit trip form
    Route::put('/trips/{trip}', [TripController::class, 'update'])->name('trips.update'); // Update trip
    Route::delete('/trips/{trip}', [TripController::class, 'destroy'])->name('trips.destroy'); // Delete trip
});

require __DIR__.'/auth.php';
