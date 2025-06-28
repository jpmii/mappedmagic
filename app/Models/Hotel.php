<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'name',
        'short_name',
        'api_id',
        'dvc',
        'transportation',
        'pool_open',
        'pool_close',
        'latitude',
        'longitude',
    ];

    /**
     * Get the destination that this hotel belongs to.
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function hotelStays()
    {
        return $this->hasMany(HotelStay::class);
    }

    /**
     * Scope to filter hotels that are Disney Vacation Club (DVC).
     */
    public function scopeDvcOnly($query)
    {
        return $query->where('dvc', true);
    }

    /**
     * Scope to filter hotels by transportation type.
     */
    public function scopeByTransportation($query, $type)
    {
        return $query->where('transportation', $type);
    }

    /**
     * Find a hotel by its API ID.
     *
     * @param string $apiId
     * @return Hotel|null
     */
    public static function findByApiId(string $apiId)
    {
        return self::where('api_id', $apiId)->first();
    }

    /**
     * Get the hotel's coordinates as an array.
     *
     * @return array
     */
    public function getCoordinatesAttribute()
    {
        return ['latitude' => $this->latitude, 'longitude' => $this->longitude];
    }
}
