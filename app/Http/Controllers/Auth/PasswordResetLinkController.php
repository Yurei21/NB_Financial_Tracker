<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\PasswordResetMail;
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

        $recipient = env('ADMIN_EMAIL', 'nbjohnson0812@gmail.com');

        // Queue the email instead of sending immediately
        Mail::to($recipient)->queue(new PasswordResetMail($user->username, $resetLink));

        return back()->with('status', 'Password reset link has been queued for sending.');
    }
}
