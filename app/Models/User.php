<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function subscribed($name = 'default')
    {
        return $this->subscriptions()
            ->where('name', $name)
            ->where(function ($query) {
                $query->whereNull('ends_at')
                    ->orWhere('ends_at', '>', now());
            })
            ->exists();
    }

    public function onTrial($name = 'default')
    {
        return $this->subscriptions()
            ->where('name', $name)
            ->whereNotNull('trial_ends_at')
            ->where('trial_ends_at', '>', now())
            ->exists();
    }

    public function onGracePeriod($name = 'default')
    {
        return $this->subscriptions()
            ->where('name', $name)
            ->whereNotNull('ends_at')
            ->where('ends_at', '>', now())
            ->exists();
    }
}
