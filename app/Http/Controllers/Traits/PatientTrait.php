<?php

namespace App\Http\Controllers\Traits;

use App\Models\Patient;
use App\Models\Clinic;

use App\User;
use Auth;
use Illuminate\Support\Facades\Log;

trait PatientTrait
{
    public function func_savePatient($request)
    {
        $obj = new Patient;

        $user = User::find($request->doctor);
        $clinic = Clinic::find($request->clinic);

        $obj->middlename = $request->middlename;
        $obj->firstname = $request->firstname;
        $obj->lastname = $request->lastname;
        $obj->gender = $request->gender;
        $obj->contact_no = $request->contact_no;
        $obj->dob = $request->dob;
        $obj->user_id = $user->getKey();
        $obj->clinic_id = $clinic->getKey();

        $obj->save();

        if(!empty($request->user_id)){
            return $obj;
        }
        
        return $obj->id;
    }

    public function func_getPatients()
    {
        $objectList = Patient::orderBy('created_at')->get();
        return $objectList;
    }

    public function func_getPatientsByClinic($clinidID)
    {
        $objectList = Patient::where('clinic_id', $clinidID)->get();
        return $objectList;
    }

    public function func_getPatient($id)
    {
        $obj = Patient::find($id);
        return $obj;
    }

    public function func_deletePatient($objID)
    {
        Patient::destroy($objID);
        return;
    }
}