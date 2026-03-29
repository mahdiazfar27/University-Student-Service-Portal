<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Faculty;
use App\Models\Course;
use App\Models\AuditLog;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role_id == 1) return redirect()->route('admin.dashboard');
        if ($user->role_id == 2) return redirect()->route('student.dashboard');
        if ($user->role_id == 3) return redirect()->route('faculty.dashboard');
        
        return view('welcome');
    }

    public function admin()
    {
        // Sample data for the dashboard (real app would fetch from DB)
        $auditLogs = AuditLog::with('user')->get();
        return view('admin.dashboard', compact('auditLogs'));
    }

    public function student()
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->first();
        $enrollments = Enrollment::with('course')->where('student_id', $student->id)->get();
        return view('student.dashboard', compact('student', 'enrollments'));
    }

    public function faculty()
    {
        $user = Auth::user();
        $faculty = Faculty::where('user_id', $user->id)->first();
        return view('faculty.dashboard', compact('faculty'));
    }
}
