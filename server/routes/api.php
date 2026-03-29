<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\LibraryController;
use App\Http\Controllers\Api\UserManagementController;
use App\Http\Controllers\Api\AcademicController;
use App\Services\AuthService;
use Illuminate\Support\Facades\Route;

Route::post('/login', [ApiAuthController::class, 'login']);
Route::get('/me', [ApiAuthController::class, 'me']);

Route::middleware('auth.jwt')->group(function () {
    // Library
    Route::get('/library/books', [LibraryController::class, 'index']);
    Route::post('/library/issue', [LibraryController::class, 'issueBook']);

    // User Management
    Route::get('/admin/users', [UserManagementController::class, 'index']);

    // Academic
    Route::get('/student/results', [AcademicController::class, 'transcript']);
    Route::get('/student/courses/available', [AcademicController::class, 'availableCourses']);
    Route::get('/student/courses/enrolled', [AcademicController::class, 'getEnrolledCourses']);
});
