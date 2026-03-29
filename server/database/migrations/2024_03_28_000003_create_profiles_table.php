<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('student_id')->unique(); // e.g. ST-2024-0412
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade');
            $table->integer('semester');
            $table->decimal('cgpa', 3, 2)->default(0.00);
            $table->integer('attendance_percentage')->default(0);
            $table->integer('credits_earned')->default(0);
            $table->timestamps();
        });

        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade');
            $table->string('designation');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculties');
        Schema::dropIfExists('students');
    }
};
