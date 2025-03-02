<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class CustomSanctumAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Retrieve the token from the Authorization header
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized User'], 401);
        }

        // Try to find the token in the database
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // Optionally, you can check if the token has expired or any other conditions
        // if (!$accessToken->isExpired()) {
        //     return response()->json(['message' => 'Token has expired'], 401);
        // }

        // Authenticate the user associated with the token
        $user = $accessToken->tokenable;

        if (!$user) {
            return response()->json(['message' => 'User not found'], 401);
        }

        // Log the user in
        Auth::login($user);

        // Proceed with the request
        return $next($request);
    }
}
