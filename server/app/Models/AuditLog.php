<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = ['action', 'user_id', 'target_entity', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
