<?php

namespace App\Http\Controllers;

use App\Models\HotelStay;
use App\Models\Trip;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelStayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Trip $trip)
    {
        return Inertia::render('HotelStays/Index', [
            'trip' => $trip->load(['hotelStays.hotel']),
            'hotelStays' => $trip->hotelStays()->with('hotel')->orderBy('check_in_date')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Trip $trip)
    {
        return Inertia::render('HotelStays/Create', [
            'trip' => $trip,
            'hotels' => Hotel::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Trip $trip)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'description' => 'nullable|string',
            'confirmation_number' => 'nullable|string|max:255',
            'price_per_night' => 'nullable|numeric|min:0',
            'number_of_nights' => 'required|integer|min:1',
            'number_of_rooms' => 'required|integer|min:1',
            'room_type' => 'nullable|string|max:255',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string',
            'is_booked' => 'boolean',
        ]);

        $hotelStay = $trip->hotelStays()->create($validated);

        return redirect()->route('trips.show', $trip)
            ->with('success', 'Hotel stay added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip, HotelStay $hotelStay)
    {
        return Inertia::render('HotelStays/Show', [
            'trip' => $trip,
            'hotelStay' => $hotelStay->load('hotel'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trip $trip, HotelStay $hotelStay)
    {
        return Inertia::render('HotelStays/Edit', [
            'trip' => $trip,
            'hotelStay' => $hotelStay->load('hotel'),
            'hotels' => Hotel::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trip $trip, HotelStay $hotelStay)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'description' => 'nullable|string',
            'confirmation_number' => 'nullable|string|max:255',
            'price_per_night' => 'nullable|numeric|min:0',
            'number_of_nights' => 'required|integer|min:1',
            'number_of_rooms' => 'required|integer|min:1',
            'room_type' => 'nullable|string|max:255',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string',
            'is_booked' => 'boolean',
        ]);

        $hotelStay->update($validated);

        return redirect()->route('trips.show', $trip)
            ->with('success', 'Hotel stay updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip, HotelStay $hotelStay)
    {
        $hotelStay->delete();

        return redirect()->route('trips.show', $trip)
            ->with('success', 'Hotel stay deleted successfully!');
    }
}
