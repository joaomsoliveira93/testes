<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locker_Access extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'id',
        'maded_at',
        'operation',
        'student_id',
        'locker_id',
    ];
}
