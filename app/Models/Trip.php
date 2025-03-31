<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Trip extends Model
{
    protected $fillable = [
        'user_id', 
        'destination_id', 
        'start_date', 
        'end_date', 
    ];

    protected $dates = [
        'start_date', 
        'end_date'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destination(): HasOne
    {
        return $this->hasOne(Destination::class);
    }
 
    public function parks(): HasMany
    {
        return $this->hasMany(Park::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
