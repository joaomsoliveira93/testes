<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class linAccount extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'id',
        'name',
        'email',
        'user_id',
    ];


}
