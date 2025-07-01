<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('Contact', [
            'success' => session('success'),
            'errors' => session('errors'),
        ]);
    }

    public function submit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // Rate limiting by IP
        $ip = $request->ip();
        $key = 'contact-form:' . $ip;
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return Inertia::render('Contact', [
                'errors' => ['message' => 'Too many submissions. Please try again later.'],
            ]);
        }
        RateLimiter::hit($key, 60 * 5); // 5 attempts per 5 minutes

        // Basic spam prevention: check for URLs in message
        if (preg_match('/https?:\/\//i', $request->message)) {
            return Inertia::render('Contact', [
                'errors' => ['message' => 'Links are not allowed in the message.'],
            ]);
        }

        // Send email to site admin
        $adminEmail = config('mail.to.contact.address');
        Mail::to($adminEmail)->send(new ContactMessage(
            $request->name,
            $request->email,
            $request->message
        ));

        return Inertia::render('Contact', [
            'success' => 'Thank you for contacting us! We will get back to you soon.'
        ]);
    }
} 