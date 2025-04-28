<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $subscription = 'default'): Response
    {
        if (! $request->user() || ! $request->user()->subscribed($subscription)) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Subscription required.'], 403);
            }

            return redirect()->route('subscription.show')
                ->with('error', 'Please subscribe to access this feature.');
        }

        return $next($request);
    }
}
