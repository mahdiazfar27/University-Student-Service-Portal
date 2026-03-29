<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Department;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'student.department', 'faculty.department'])->get();
        $roles = Role::all();
        $departments = Department::all();

        return response()->json([
            'users' => $users,
            'roles' => $roles,
            'departments' => $departments
        ]);
    }
}
