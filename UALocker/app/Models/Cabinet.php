<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabinet extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'id',
        'local',
        'coordX',
        'coordY',
    ];
}
