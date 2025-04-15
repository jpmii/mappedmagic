<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\Park;
use App\Models\Reservation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function create(Trip $trip)
    {
        $parks = Park::select('id', 'name')->where('destination_id', $trip->destination_id)->orderBy('name')->get();
        $attractions = Attraction::select('id', 'name', 'park_id', 'type')->orderBy('name')->get();
    
        return Inertia::render('Reservations/Create', [
            'trip' => $trip,
            'parks' => $parks,
            'attractions' => $attractions,
        ]);
    }
    
    public function store(Request $request, Trip $trip)
    {
        $validated = $request->validate([
            'park_id' => 'required|integer',
            'attraction_id' => 'required|exists:attractions,id',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'confirmation_number' => 'nullable',
            'party_size' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);

        $attraction = Attraction::findOrFail($validated['attraction_id']);
        $atype = $attraction->type;

        Reservation::create([
            'user_id' => auth()->id(),
            'trip_id' => $trip->id,
            'park_id'=> $validated['park_id'],
            'attraction_id' => $validated['attraction_id'],
            'type'=> $atype,
            'date'=> $validated['date'],
            'time'=> $validated['time'],
        ]);
    
        return redirect()->route('trips.show', $trip);
    }

    public function edit(Trip $trip, Reservation $reservation)
    {
        $parks = Park::select('id', 'name')->orderBy('name')->get();
        $attractions = Attraction::select('id', 'name', 'park_id')->orderBy('name')->get();

        return Inertia::render('Reservations/Edit', [
            'trip' => $trip,
            'reservation' => $reservation,
            'parks' => $parks,
            'attractions' => $attractions
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'park_id' => 'required|integer|exists:parks,id',
            'attraction_id' => 'required|exists:attractions,id',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        $attraction = Attraction::findOrFail($validated['attraction_id']);
        $validated['type'] = $attraction->type ?? null;

        $reservation->update([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('trips.show', $reservation->trip_id)->with('success', 'Reservation updated!');
    }

    public function destroy(Trip $trip, Reservation $reservation)
    {
        abort_unless(
            $reservation->trip_id === $trip->id && $reservation->user_id === auth()->id(),
            403
        );

        $reservation->delete();

        return redirect()
            ->route('trips.show', $trip->id)
            ->with('success', 'Reservation deleted successfully.');
    }
    
}
