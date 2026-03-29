<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssuedBook extends Model
{
    protected $fillable = ['book_id', 'student_id', 'issue_date', 'expected_return_date', 'actual_return_date', 'status'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
