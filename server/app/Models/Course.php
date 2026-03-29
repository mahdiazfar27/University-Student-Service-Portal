<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['code', 'name', 'credits', 'type'];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
