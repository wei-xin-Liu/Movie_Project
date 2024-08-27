<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'sub' => $this->getJWTIdentifier(), // User ID or any other unique identifier
            'iat' => time(), // Issued at time
            'name' => $this->name, // User's name
            'email' => $this->email, // User's email
            'membership_point' => $this->getTotalRewardPoints(),
            'membership_level' => $this->getMembershipLevel(),
        ];
    }

    public function orders()
    {
        return $this->hasMany(MemberOrder::class, 'user_id');
    }

    // Calculate the total reward points for the user
    public function getTotalRewardPoints()
    {
        return $this->orders->sum('rewardPoint');
    }

    // Determine the membership level based on total reward points
    public function getMembershipLevel()
    {
        $points = $this->getTotalRewardPoints();

        if ($points > 1000) {
            return '金金會員';
        } elseif ($points >= 500) {
            return '紫紫會員';
        } else {
            return '藍藍會員';
        }
    }
}
