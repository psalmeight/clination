<?php

namespace App\Http\Controllers\Traits;

use App\Models\Patient;
use App\Models\Clinic;

use App\User;
use Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

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
        $obj->fullname = $request->lastname . ', ' . $request->firstname . ' ' . $request->middlename;
        $obj->gender = $request->gender;
        $obj->contact_no = $request->contact_no;
        $obj->dob = $request->dob;
        $obj->address = $request->address;
        $obj->user_id = $user->getKey();
        $obj->clinic_id = $clinic->getKey();
        $obj->owned_by = $clinic->user_id;
        $obj->first_visit_date = Carbon::today()->toDateString();
        $obj->last_visit_date = Carbon::today()->toDateString();

        $obj->save();
        
        return $obj->id;
    }

    public function func_updatePatient($request)
    {
        $obj = new Patient;

        if(isset($request->patient_id) || !empty($request->patient_id))
            $obj = Patient::find($request->patient_id);

        $obj->middlename = $request->middlename;
        $obj->firstname = $request->firstname;
        $obj->lastname = $request->lastname;
        $obj->fullname = $request->lastname . ', ' . $request->firstname . ' ' . $request->middlename;
        $obj->gender = $request->gender;
        $obj->address = $request->address;
        $obj->contact_no = $request->contact_no;
        $obj->dob = $request->dob;

        $obj->father_name = $request->father_name;
        $obj->father_occupation = $request->father_occupation;
        $obj->mother_name = $request->mother_name;
        $obj->mother_occupation = $request->mother_occupation;

        $obj->save();
        
        return $obj->id;
    }

    public function func_updatePatientPast($request)
    {
        $obj = new Patient;

        if(isset($request->patient_id) || !empty($request->patient_id))
            $obj = Patient::find($request->patient_id);

        $obj->family_history = $request->family_history;
        $obj->personal_history = $request->personal_history;
        $obj->allergies = $request->allergies;

        $obj->save();
        
        return $obj->id;
    }

    public function func_getPatients($search)
    {
        $objectList = Patient::orderBy('created_at')->orderBy('lastname', 'desc')->get();

        if(!empty($search))
            $objectList = Patient::whereRaw("upper(fullname) like ?", ['%' . strtoupper($search) . '%'])->orderBy('lastname', 'desc')->get();
            
        return $objectList;
    }

    public function func_getPatientsByClinic($clinidID, $search)
    { 
        $objectList = Patient::where('clinic_id', $clinidID)->orderBy('lastname', 'desc')->get();

        if(!empty($search))
            $objectList = Patient::whereRaw("clinic_id = ? and upper(fullname) like ?", [$clinidID, '%' . strtoupper($search) . '%'])->orderBy('lastname', 'desc')->get();
        
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
