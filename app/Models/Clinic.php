<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Clinic extends Model
{
    use SoftDeletes;

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function clinic_users(){
        return $this->hasMany('App\Models\ClinicUser');
    }

    public function patients(){
        return $this->hasMany('App\Models\Patient');
    }

    public static function boot() {
        parent::boot();

        static::deleting(function($user) {
             $user->clinic_users()->delete();
        });
    }
}