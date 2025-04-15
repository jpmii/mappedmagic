<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        return Inertia::render('Trips/Index', [
            'trips' => Trip::where('user_id', auth()->id())->get(),
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
        
        return Inertia::render('Trips/Show', [
            'trip' => $trip,
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

    public function daily(Trip $trip)
    {
        $trip->load(['reservations.attraction']);

        $grouped = $trip->reservations->sortBy('time')->groupBy(function ($res) {
            return \Carbon\Carbon::parse($res->date)->format('Y-m-d');
        });

        return Inertia::render('Trips/Daily', [
            'trip' => $trip,
            'groupedReservations' => $grouped,
        ]);
    }

}

