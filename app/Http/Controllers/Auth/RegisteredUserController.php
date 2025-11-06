<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\RegistrationCodeMail;
use App\Models\RegistrationCode;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $plainCode = strtoupper(Str::random(10));

        RegistrationCode::create([
            'code_hash' => Hash::make($plainCode),
            'expires_at' => now()->addMinutes(10),
        ]);

        $recipient = config('mail.admin_address', env('ADMIN_EMAIL', 'clarksab21@gmail.com'));

        Mail::to($recipient)->queue(new RegistrationCodeMail($plainCode));

        return Inertia::render('Auth/Register');
        
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Password::min(12)
            ->mixedCase()
            ->numbers()
            ->symbols()
            ->uncompromised(),],
            'registration_code' => 'required|string',
        ]);

        if(User::where("username", $request->username)->exists()){
            return back()->withErrors(['username' => 'This username is already taken.'])->onlyInput('username');
        }

        $codeEntry = RegistrationCode::validateCode($request->registration_code);

        if(!$codeEntry){
            return back()->withErrors([
                'registration_code' => "Invalid or Expired Code",
            ]);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $codeEntry->delete();

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    public function isOnline(): bool
    {
        try{
            $response = Http::timeout(2)->get('https://clients3.google.com/generate_204');
            return $response->status() === 204;
        } catch(\Exception $e) {
            return false;
        }
    }
}
