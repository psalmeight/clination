<?php

namespace App\Http\Controllers\Traits;

use Auth;
use App\User;
use App\Models\Clinic;
use App\Models\ClinicUser;

use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

trait ClinicUserTrait
{

    public function func_saveClinicUser($request)
    {   
        $user = User::find($request->user_id);
        $clinic = Clinic::find($request->clinic_id);

        $obj = new ClinicUser;

        $obj->user_id = $user->getKey();
        $obj->clinic_id = $clinic->getKey();

        $obj->save();

        return $obj->id;
    }

    public function func_getClinicUser($objID)
    {
        $obj = ClinicUser::find($objID);
        return $obj->data;
    }

    public function func_getClinicUsers()
    {
        $objList = ClinicUser::orderBy('created_at')->get();
        return $objList;
    }
    
    public function func_getClinicUsersByUser($userID)
    {
        $objList = ClinicUser::where('user_id', $userID)->with(['user', 'clinic'])->get();
        return $objList;
    }

    public function func_getClinicUsersByClinic($clinicID)
    {
        $objList = ClinicUser::where('clinic_id', $clinicID)->with(['clinic','user'])->get();
        return $objList;
    }

    public function func_deleteClinicUser($objID)
    {
        ClinicUser::destroy($objID);
        return;
    }
}
