<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecureHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // Set different CSP based on environment
        if (app()->environment('local')) {
            // Development environment - allow Vite dev server
            $csp = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; ";
            $csp .= "style-src * 'unsafe-inline'; ";
            $csp .= "script-src * 'unsafe-inline' 'unsafe-eval'; ";
            $csp .= "connect-src * ws: wss:; ";
            $csp .= "font-src * data:; ";
            $csp .= "img-src * data: blob: file:;";
            $response->headers->set('Content-Security-Policy', $csp);
        } else {
            // Production environment
            $csp = "default-src 'self'; ";
            $csp .= "style-src 'self' 'unsafe-inline' https://fonts.bunny.net; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval'; ";
            $csp .= "font-src 'self' https://fonts.bunny.net; ";
            $csp .= "img-src 'self' data: blob:;";
            $response->headers->set('Content-Security-Policy', $csp);
        }
        
        return $response;
    }
} 