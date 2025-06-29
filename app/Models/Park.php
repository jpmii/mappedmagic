<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Park extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'api_id',
        'destination_id',
    ];

    /**
     * Get the destination that this park belongs to.
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Get the reservations associated with this park.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Get the attractions for this park.
     */
    public function attractions()
    {
        return $this->hasMany(Attraction::class);
    }

    /**
     * Scope to filter parks by destination.
     */
    public function scopeByDestination($query, $destinationId)
    {
        return $query->where('destination_id', $destinationId);
    }

    /**
     * Find a park by its API ID.
     *
     * @param string $apiId
     * @return Park|null
     */
    public static function findByApiId(string $apiId)
    {
        return self::where('api_id', $apiId)->first();
    }
}
