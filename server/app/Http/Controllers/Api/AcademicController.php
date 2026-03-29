<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\StudentResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AcademicController extends Controller
{
    public function getEnrolledCourses()
    {
        $user = Auth::user();
        if (!$user || !$user->student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $courses = Course::whereHas('enrollments', function ($q) use ($user) {
            $q->where('student_id', $user->student->id);
        })->with('department')->get();
        return response()->json($courses);
    }
}
