<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;

class RegistrationCode extends Model
{
    /** @use HasFactory<\Database\Factories\RegistrationCodeFactory> */
    use HasFactory;

    protected $fillable = ['code_hash', 'expires_at'];

    protected $dates = ['expires_at'];

    public static function validateCode(string $code): ?self
    {
        $now = Carbon::now();

        foreach(self::where('expires_at', '>', $now)->get() as $entry) {
            if(Hash::check($code, $entry->code_hash)) {
                return $entry;
            }
        }

        return null;
    }

    public function isExpired()
    {
        return $this->expires_at && $this->expires_at->isPast();
    }
}
