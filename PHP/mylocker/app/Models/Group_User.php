<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group_User extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'student_id',
        'group_id',
    ];

}
