<?php

namespace App\Http\Controllers\Traits;

use App\Models\PatientVaccination;
use App\Models\Patient;

use App\User;
use Auth;
use Illuminate\Support\Facades\Log;

trait PatientVaccinationTrait
{
    public function func_savePatientVaccination($request)
    {
        $obj = new PatientVaccination;

        $patient = Patient::find($request->patient);

        $obj->patient_id = $patient->getKey();

        $obj->visit_datetime = $request->visit_datetime;
        $obj->vaccination_date = $request->vaccination_date;
        $obj->vaccination_details = $request->vaccination_details;
        $obj->next_vaccination_schedule = $request->next_vaccination_schedule;
        
        $obj->vaccination_notes = $request->vaccination_notes;

        $obj->save();

        return $obj->id;
    }

    public function func_getPatientVaccinations()
    {
        $objectList = PatientVaccination::orderBy('created_at')->get();
        return $objectList;
    }

    public function func_getPatientVaccinationsByPatient($patientID)
    {
        $objectList = PatientVaccination::where('patient_id', $patientID)->get();
        return $objectList;
    }

    public function func_getPatientVaccination($id)
    {
        $obj = PatientVaccination::find($id);
        return $obj;
    }

    public function func_deletePatientVaccination($objID)
    {
        PatientVaccination::destroy($objID);
        return;
    }
}
