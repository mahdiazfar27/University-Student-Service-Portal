<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Notice;
use App\Models\Routine;
use App\Models\Enrollment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $adminRole = Role::create(['name' => 'Admin']);
        $studentRole = Role::create(['name' => 'Student']);
        $facultyRole = Role::create(['name' => 'Faculty']);

        // 2. Sample Admin
        $admin = User::create([
            'name' => 'Dr. Robert Chen',
            'email' => 'admin@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        // 3. Sample Student
        $studentUser = User::create([
            'name' => 'Alex Henderson',
            'email' => 'alex@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $studentRole->id,
        ]);
        $student = Student::create([
            'user_id' => $studentUser->id,
            'student_id' => 'ST-2024-09821',
            'department' => 'B.Sc. Computer Science',
            'semester' => 5,
            'cgpa' => 3.82,
            'attendance_percentage' => 92,
            'credits_earned' => 84,
        ]);

        // 4. Sample Faculty
        $facultyUser = User::create([
            'name' => 'Dr. Sarah Jenkins',
            'email' => 'sarah@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $facultyRole->id,
        ]);
        $faculty = Faculty::create([
            'user_id' => $facultyUser->id,
            'department' => 'Computer Science',
            'designation' => 'Senior Faculty',
        ]);

        // 5. Courses
        $dbms = Course::create(['code' => 'CSE-301', 'name' => 'Database Management Systems', 'credits' => 3.0, 'type' => 'Theory']);
        $algo = Course::create(['code' => 'CSE-305', 'name' => 'Algorithms & Complexity', 'credits' => 3.0, 'type' => 'Theory']);
        $linear = Course::create(['code' => 'MATH-311', 'name' => 'Linear Algebra II', 'credits' => 3.0, 'type' => 'Theory']);
        $ethics = Course::create(['code' => 'HUM-202', 'name' => 'Ethics & Professionalism', 'credits' => 2.0, 'type' => 'Theory']);

        // 6. Enrollments
        Enrollment::create(['student_id' => $student->id, 'course_id' => $dbms->id, 'semester' => 5, 'syllabus_coverage' => 75]);
        Enrollment::create(['student_id' => $student->id, 'course_id' => $algo->id, 'semester' => 5, 'syllabus_coverage' => 42]);
        Enrollment::create(['student_id' => $student->id, 'course_id' => $linear->id, 'semester' => 5, 'syllabus_coverage' => 90]);
        Enrollment::create(['student_id' => $student->id, 'course_id' => $ethics->id, 'semester' => 5, 'syllabus_coverage' => 60]);

        // 7. Notices
        Notice::create(['title' => 'Submission of Semester marks', 'content' => 'All faculty members are requested to upload marks by 30th Oct.', 'type' => 'Urgent']);
        Notice::create(['title' => 'Research Grant Applications Open', 'content' => 'The university is inviting applications for...', 'type' => 'Meeting']);
        Notice::create(['title' => 'Updated Library Access Policy', 'content' => 'New digital access guidelines for faculty...', 'type' => 'Info']);

        // 8. Assignments
        Assignment::create(['student_id' => $student->id, 'course_id' => $dbms->id, 'title' => 'DBMS Assignment 3', 'due_date' => now()->addHours(2), 'status' => 'Pending']);
        Assignment::create(['student_id' => $student->id, 'course_id' => $algo->id, 'title' => 'Algorithm Quiz Prep', 'due_date' => now()->addDay(), 'status' => 'Pending']);
    }
}
