<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\Department;
use App\Models\Book;
use App\Models\Course;
use App\Models\StudentResult;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $adminRole = Role::create(['name' => 'Admin']);
        $studentRole = Role::create(['name' => 'Student']);
        $facultyRole = Role::create(['name' => 'Faculty']);
        $accountantRole = Role::create(['name' => 'Accountant']);

        // 2. Departments
        $cse = Department::create(['name' => 'Computer Science', 'code' => 'CSE']);
        $reg = Department::create(['name' => "Registrar's Office", 'code' => 'REG']);
        $fin = Department::create(['name' => 'Finance & Accounts', 'code' => 'FIN']);
        $hr = Department::create(['name' => 'Human Resources', 'code' => 'HR']);

        // 3. Admin User
        $admin = User::create([
            'name' => 'Dr. Michael Chen',
            'email' => 'admin@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        // 4. Student User
        $studentUser = User::create([
            'name' => 'Alex Thompson',
            'email' => 'student@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $studentRole->id,
        ]);

        $student = Student::create([
            'user_id' => $studentUser->id,
            'student_id' => '2024-8892',
            'department_id' => $cse->id,
            'semester' => 7,
            'cgpa' => 3.85,
            'credits_earned' => 96,
        ]);

        // 5. Faculty User
        $facultyUser = User::create([
            'name' => 'Dr. Sarah Vance',
            'email' => 'faculty@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $facultyRole->id,
        ]);

        $faculty = Faculty::create([
            'user_id' => $facultyUser->id,
            'department_id' => $cse->id,
            'designation' => 'Professor',
        ]);

        // 5.5 Accountant User
        $accountantUser = User::create([
            'name' => 'Dr. Robert Miller',
            'email' => 'finance@iums.edu',
            'password' => Hash::make('password'),
            'role_id' => $accountantRole->id,
        ]);

        // 6. Books
        Book::create([
            'isbn' => '978-0262033842',
            'title' => 'Advanced Algorithms',
            'author' => 'Thomas H. Cormen',
            'department_id' => $cse->id,
            'total_copies' => 15,
            'available_copies' => 12,
            'image_url' => 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42',
        ]);

        Book::create([
            'isbn' => '978-0201896831',
            'title' => 'Quantum Mechanics',
            'author' => 'David J. Griffiths',
            'department_id' => $cse->id,
            'total_copies' => 10,
            'available_copies' => 10,
        ]);

        // 7. Courses
        $ai = Course::create(['code' => 'CS-402', 'name' => 'Advanced Algorithms', 'credits' => 3, 'department_id' => $cse->id]);
        $db = Course::create(['code' => 'DB-305', 'name' => 'Database Systems', 'credits' => 3, 'department_id' => $cse->id]);
        $ux = Course::create(['code' => 'UX-210', 'name' => 'Introduction to UX Design', 'credits' => 3, 'department_id' => $cse->id]);
        $mth = Course::create(['code' => 'MTH-101', 'name' => 'Discrete Mathematics', 'credits' => 3, 'department_id' => $cse->id]);
        $os = Course::create(['code' => 'CS-310', 'name' => 'Operating Systems', 'credits' => 3, 'department_id' => $cse->id]);
        $ml = Course::create(['code' => 'AI-405', 'name' => 'Machine Learning', 'credits' => 3, 'department_id' => $cse->id]);
        $se = Course::create(['code' => 'SE-301', 'name' => 'Software Engineering', 'credits' => 3, 'department_id' => $cse->id]);

        // 8. Results
        StudentResult::create(['student_id' => $student->id, 'course_id' => $ai->id, 'semester' => 'Spring 2024', 'grade_point' => 4.00, 'grade' => 'A+', 'remarks' => 'Excellent']);
        StudentResult::create(['student_id' => $student->id, 'course_id' => $db->id, 'semester' => 'Spring 2024', 'grade_point' => 3.75, 'grade' => 'A', 'remarks' => 'Very Good']);

        // 9. Enrollments
        DB::table('enrollments')->insert([
            ['student_id' => $student->id, 'course_id' => $ai->id, 'semester' => 7, 'syllabus_coverage' => 75],
            ['student_id' => $student->id, 'course_id' => $db->id, 'semester' => 7, 'syllabus_coverage' => 45],
            ['student_id' => $student->id, 'course_id' => $ux->id, 'semester' => 7, 'syllabus_coverage' => 92],
            ['student_id' => $student->id, 'course_id' => $mth->id, 'semester' => 7, 'syllabus_coverage' => 20],
            ['student_id' => $student->id, 'course_id' => $os->id, 'semester' => 7, 'syllabus_coverage' => 60],
            ['student_id' => $student->id, 'course_id' => $ml->id, 'semester' => 7, 'syllabus_coverage' => 35],
            ['student_id' => $student->id, 'course_id' => $se->id, 'semester' => 7, 'syllabus_coverage' => 80],
        ]);
    }
}
