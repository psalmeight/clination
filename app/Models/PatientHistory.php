<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientHistory extends Model
{
    use SoftDeletes;

    public function patient(){
        return $this->belongsTo('App\Patient');
    }
}