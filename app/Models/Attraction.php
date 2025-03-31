<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'park_id',
        'name',
        'api_id',
        'type',
        'height_requirement',
        'fast_pass_available',
        'latitude',
        'longitude',
    ];

    /**
     * Get the park that this attraction belongs to.
     */
    public function park()
    {
        return $this->belongsTo(Park::class);
    }

    /**
     * Scope to filter attractions by type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter attractions that require a height requirement.
     */
    public function scopeWithHeightRequirement($query)
    {
        return $query->where('height_requirement', '>', 0);
    }

    /**
     * Scope to filter attractions with FastPass availability.
     */
    public function scopeFastPassAvailable($query)
    {
        return $query->where('fast_pass_available', true);
    }

    /**
     * Find an attraction by its API ID.
     *
     * @param string $apiId
     * @return Attraction|null
     */
    public static function findByApiId(string $apiId)
    {
        return self::where('api_id', $apiId)->first();
    }

    /**
     * Get the attraction's coordinates as an array.
     *
     * @return array
     */
    public function getCoordinatesAttribute()
    {
        return ['latitude' => $this->latitude, 'longitude' => $this->longitude];
    }
}
