<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_Teacher extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'project_id',
        'teacher_id',
    ];

}
