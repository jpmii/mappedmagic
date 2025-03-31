<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
        'api_id',
        'city',
        'state',
        'country',
    ];

    /**
     * Get the parks associated with this destination.
     */
    public function parks()
    {
        return $this->hasMany(Park::class);
    }

    /**
     * Get the hotels associated with this destination.
     */
    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    /**
     * Find a destination by its API ID.
     *
     * @param string $apiId
     * @return Destination|null
     */
    public static function findByApiId(string $apiId)
    {
        return self::where('api_id', $apiId)->first();
    }
}
