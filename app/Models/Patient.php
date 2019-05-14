<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    public function clinic(){
        return $this->belongsTo('App\Clinic');
    }

    public function patient_histories(){
        return $this->hasMany('App\Models\PatientHistory');
    }

    public function patient_vaccinations(){
        return $this->hasMany('App\Models\PatientVaccination');
    }
}