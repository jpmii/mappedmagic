<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'stripe_id',
        'stripe_status',
        'stripe_price',
        'quantity',
        'trial_ends_at',
        'ends_at',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function active()
    {
        return is_null($this->ends_at) || $this->onTrial();
    }

    public function onTrial()
    {
        return $this->trial_ends_at && $this->trial_ends_at->isFuture();
    }

    public function canceled()
    {
        return ! is_null($this->ends_at);
    }

    public function onGracePeriod()
    {
        return $this->ends_at && $this->ends_at->isFuture();
    }
}
