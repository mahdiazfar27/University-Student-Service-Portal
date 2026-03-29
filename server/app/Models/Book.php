<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['isbn', 'title', 'author', 'department_id', 'total_copies', 'available_copies', 'image_url'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
