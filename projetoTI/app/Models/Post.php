<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'link',
        'social_network',
        'category_id',
        'study_id',
        'useer_id',
        'date',
        'obs',
    ];

    public function categories(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function studies(){
        return $this->belongsTo(Study::class, 'study_id');
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}