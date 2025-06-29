<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Park;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\WaitTimeService;
use Illuminate\Support\Facades\Cache;

class TripController extends Controller
{
    public function index()
    {
        return Inertia::render('Trips/Index', [
            'trips' => Trip::where('user_id', auth()->id())
                ->with(['hotelStays.hotel'])
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Trips/Create', [
            'destinations' => Destination::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'destination_id' => 'required|exists:destinations,id',
        ]);

        Trip::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'destination_id' => $request->destination_id,
        ]);

        return redirect()->route('trips.index');
    }

    public function show(Trip $trip)
    {
        $trip->load('reservations.attraction');
        $trip->load(['hotelStays.hotel']);

        return Inertia::render('Trips/Show', [
            'trip' => $trip,
            'hotelStays' => $trip->hotelStays()->with('hotel')->orderBy('check_in_date')->get(),
        ]);
    }

    public function edit(Trip $trip)
    {
        return Inertia::render('Trips/Edit', [
            'trip' => $trip,
            'destinations' => Destination::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Trip $trip)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $trip->update($request->all());

        return redirect()->route('trips.index');
    }

    public function destroy(Trip $trip)
    {
        $trip->delete();

        return redirect()->route('trips.index');
    }

    public function daily(Trip $trip, WaitTimeService $waitTimeService)
    {
        $trip->load(['reservations.attraction']);

        $grouped = $trip->reservations->sortBy('time')->groupBy(function ($res) {
            return \Carbon\Carbon::parse($res->date)->format('Y-m-d');
        });

        // Eager load parks and their attractions
        $parks = Park::with('attractions')->get();

        // Build a map of attraction_id => cached live_data (or null)
        $waitTimes = [];
        foreach ($parks as $park) {
            foreach ($park->attractions as $attraction) {
                $waitTimes[$attraction->id] = Cache::get("wait_time_{$attraction->id}");
            }
        }

        return Inertia::render('Trips/Daily', [
            'trip' => $trip,
            'groupedReservations' => $grouped,
            'parks' => $parks,
            'waitTimes' => $waitTimes,
        ]);
    }

}
