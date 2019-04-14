<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClinicUser extends Model
{
    use SoftDeletes;

    public function clinic(){
        return $this->belongsTo('App\Models\Clinic');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }
}