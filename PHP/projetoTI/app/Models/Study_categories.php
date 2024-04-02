<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Study_categories extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'study_id',
        'category_id',
       
    ];

    public function categories(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function studies(){
        return $this->belongsTo(Study::class, 'study_id');
    }
}
