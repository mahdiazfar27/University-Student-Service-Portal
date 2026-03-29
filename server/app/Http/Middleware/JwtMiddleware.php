<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = substr($authHeader, 7);
        $user = $this->authService->getCurrentUser($token);

        if (!$user) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }

        // Set the authenticated user for this request natively in Laravel Auth
        Auth::setUser($user);

        return $next($request);
    }
}
