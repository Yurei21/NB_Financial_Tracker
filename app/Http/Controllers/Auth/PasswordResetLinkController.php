<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|exists:users,username',
        ]);

        $user = User::where('username', $request->username)->firstOrFail();

        $token = Str::random(64);
        $resetLink = url("/reset-password/{$token}?username={$user->username}");

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        Mail::raw(
            "Password reset requested for user '{$user->username}'.\n\nReset link: {$resetLink}\nValid for 60 minutes.",
            function ($message) {
                $message->to(env('ADMIN_EMAIL', 'clarksab21@gmail.com'))
                        ->subject("Financial Tracker Password Reset");
            }
        );

        return back()->with('status', 'Password reset link has been sent to the business email.');
    }
}
