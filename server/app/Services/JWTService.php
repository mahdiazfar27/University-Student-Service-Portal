<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JWTService
{
    private static $secret;

    public static function init()
    {
        self::$secret = env('JWT_SECRET', env('APP_KEY'));
    }

    public static function generateToken($user)
    {
        self::init();
        $payload = [
            'iss' => env('APP_URL'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 hours
        ];

        return JWT::encode($payload, self::$secret, 'HS256');
    }

    public static function decodeToken($token)
    {
        self::init();
        try {
            return JWT::decode($token, new Key(self::$secret, 'HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}
