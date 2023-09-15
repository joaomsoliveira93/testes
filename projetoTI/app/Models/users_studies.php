<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users_studies extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'study_id',
        'user_id',
       
    ];

    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function studies(){
        return $this->belongsTo(Study::class, 'study_id');
    }
}
