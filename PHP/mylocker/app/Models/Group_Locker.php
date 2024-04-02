<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group_Locker extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'group_id',
        'locker_id',
    ];
}
