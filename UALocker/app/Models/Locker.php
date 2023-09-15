<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Locker extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'id',
        'isFree',
        'position',
        'releaseDate',
        'cabinet_id',
    ];
}
