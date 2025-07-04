<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //

    protected $table = 'job';

    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'status',
        'applications',
        'duration',
        'description'
    ];

    protected $casts = [
        'applications' => 'integer',
    ];
}
