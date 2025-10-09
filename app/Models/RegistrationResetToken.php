<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationResetToken extends Model
{
    // Explicit table name
    protected $table = 'registration_reset_tokens';

    // Disable auto-incrementing primary key since email is primary
    public $incrementing = false;

    // Primary key type
    protected $keyType = 'string';

    // Disable timestamps if you only have `created_at`
    public $timestamps = false;

    // Mass-assignable fields
    protected $fillable = ['email', 'token', 'created_at'];
}
