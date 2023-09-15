<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LockerRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'status',
        'group_id',
        'project_id',
        
    ];
}
