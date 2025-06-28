<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelStay extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'hotel_id',
        'description',
        'confirmation_number',
        'price_per_night',
        'number_of_nights',
        'number_of_rooms',
        'room_type',
        'check_in_date',
        'check_out_date',
        'check_in_time',
        'check_out_time',
        'notes',
        'is_booked',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'check_in_time' => 'datetime:H:i',
        'check_out_time' => 'datetime:H:i',
        'price_per_night' => 'decimal:2',
        'is_booked' => 'boolean',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function getTotalPriceAttribute()
    {
        if ($this->price_per_night) {
            return $this->price_per_night * $this->number_of_nights * $this->number_of_rooms;
        }
        return null;
    }

    public function getFormattedCheckInTimeAttribute()
    {
        return $this->check_in_time ? $this->check_in_time->format('H:i') : null;
    }

    public function getFormattedCheckOutTimeAttribute()
    {
        return $this->check_out_time ? $this->check_out_time->format('H:i') : null;
    }
}
