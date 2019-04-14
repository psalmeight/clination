<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use SoftDeletes;

    public function user(){
        return $this->belongsTo('App\User');
    }
}