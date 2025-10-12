<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;

class User extends Authenticatable 
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
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
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        $resetLink = url("/reset-password/{$token}?username={$this->username}");

        Mail::raw(
            "Password reset requested for user '{$this->username}'.\n\nReset link: {$resetLink}\nValid for 60 minutes.",
            function ($message) {
                $message->to(env('ADMIN_EMAIL', 'clarksab21@gmail.com'))
                        ->subject("Financial Tracker Password Reset");
            }
        );
    }
}
