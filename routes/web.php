<?php

use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\HotelStayController;
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
    //Trips
    Route::get('/trips', [TripController::class, 'index'])->name('trips.index'); // List trips
    Route::get('/trips/create', [TripController::class, 'create'])->name('trips.create'); // Create trip form
    Route::post('/trips', [TripController::class, 'store'])->name('trips.store'); // Save new trip
    Route::get('/trips/{trip}', [TripController::class, 'show'])->name('trips.show'); // View trip details
    Route::get('/trips/{trip}/edit', [TripController::class, 'edit'])->name('trips.edit'); // Edit trip form
    Route::put('/trips/{trip}', [TripController::class, 'update'])->name('trips.update'); // Update trip
    Route::delete('/trips/{trip}', [TripController::class, 'destroy'])->name('trips.destroy'); // Delete trip
    Route::get('/trips/{trip}/daily', [TripController::class, 'daily'])->name('trips.daily'); //Daily View
    //Reservations
    Route::prefix('trips/{trip}')->middleware(['auth'])->group(function () {
        Route::get('reservations/create', [ReservationController::class, 'create'])->name('reservations.create');
        Route::post('reservations', [ReservationController::class, 'store'])->name('reservations.store');
        Route::get('reservations/{reservation}/edit', [ReservationController::class, 'edit'])->name('reservations.edit');
        Route::put('reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
        Route::delete('reservations/{reservation}', [ReservationController::class, 'destroy'])->name('reservations.destroy');
    });
    //Hotel Stays
    Route::prefix('trips/{trip}')->middleware(['auth'])->group(function () {
        Route::get('hotel-stays', [HotelStayController::class, 'index'])->name('hotel-stays.index');
        Route::get('hotel-stays/create', [HotelStayController::class, 'create'])->name('hotel-stays.create');
        Route::post('hotel-stays', [HotelStayController::class, 'store'])->name('hotel-stays.store');
        Route::get('hotel-stays/{hotelStay}', [HotelStayController::class, 'show'])->name('hotel-stays.show');
        Route::get('hotel-stays/{hotelStay}/edit', [HotelStayController::class, 'edit'])->name('hotel-stays.edit');
        Route::put('hotel-stays/{hotelStay}', [HotelStayController::class, 'update'])->name('hotel-stays.update');
        Route::delete('hotel-stays/{hotelStay}', [HotelStayController::class, 'destroy'])->name('hotel-stays.destroy');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Subscription Routes
    Route::get('/subscription', [SubscriptionController::class, 'show'])->name('subscription.show');
    Route::post('/subscription', [SubscriptionController::class, 'store'])->name('subscription.store');
    Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.cancel');
    Route::post('/subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.resume');
});

require __DIR__.'/auth.php';
