<?php

namespace App\Services;

use App\Models\User;
use App\Models\Student;
use App\Models\Faculty;
use App\Services\JWTService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function login(array $credentials)
    {
        $user = User::with('role')->where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $token = JWTService::generateToken($user);
        
        $userWithDetails = $user->toArray();
        if ($user->role_id == 2) { // Student
            $userWithDetails['student'] = Student::with('department')->where('user_id', $user->id)->first();
        } elseif ($user->role_id == 3) { // Faculty
            $userWithDetails['faculty'] = Faculty::with('department')->where('user_id', $user->id)->first();
        }

        return [
            'token' => $token,
            'user' => $userWithDetails
        ];
    }

    public function getCurrentUser(string $token)
    {
        $decoded = JWTService::decodeToken($token);
        if (!$decoded || !isset($decoded->sub)) {
            return null;
        }

        $user = User::with('role')->find($decoded->sub);
        if (!$user) return null;

        $userWithDetails = $user->toArray();
        if ($user->role_id == 2) {
            $userWithDetails['student'] = Student::with('department')->where('user_id', $user->id)->first();
        } elseif ($user->role_id == 3) {
            $userWithDetails['faculty'] = Faculty::with('department')->where('user_id', $user->id)->first();
        }

        return $userWithDetails;
    }
}
