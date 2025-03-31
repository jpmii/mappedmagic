<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'trip_id',
        'park_id',
        'type',
        'name',
        'date',
        'time',
        'confirmation_number',
        'party_size',
        'status',
    ];

    /**
     * Get the user that owns the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the trip that this reservation is associated with.
     */
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    /**
     * Get the park where the reservation takes place.
     */
    public function park()
    {
        return $this->belongsTo(Park::class);
    }
}
