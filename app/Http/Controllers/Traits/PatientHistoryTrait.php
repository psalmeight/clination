<?php

namespace App\Http\Controllers\Traits;

use App\Models\PatientHistory;
use App\Models\Patient;

use App\User;
use Auth;
use Illuminate\Support\Facades\Log;

trait PatientHistoryTrait
{
    public function func_savePatientHistory($request)
    {
        $obj = new PatientHistory;

        if(isset($request->patient_history_id) && !empty($request->patient_history_id))
            $obj = PatientHistory::find($request->patient_history_id);
            
        $patient = Patient::find($request->patient);

        $obj->patient_id = $patient->getKey();

        $obj->visit_datetime = $request->visit_datetime;
        $obj->chief_complaint = $request->chief_complaint;
        $obj->history_present_illness = $request->history_present_illness;
        $obj->physical_exam = $request->physical_exam;
        $obj->diagnosis = $request->diagnosis;

        $obj->init_weight = $request->init_weight;
        $obj->init_height = $request->init_height;
        $obj->init_blood_pressure = $request->init_blood_pressure;
        $obj->init_pulse_rate = $request->init_pulse_rate;
        $obj->init_resp_rate = $request->init_resp_rate;
        $obj->init_temp = $request->init_temp;
        $obj->medications = $request->medications;
        $obj->diagnostics = $request->diagnostics;

        $obj->save();

        return $obj->id;
    }

    public function func_getPatientHistories()
    {
        $objectList = PatientHistory::orderBy('created_at')->get();
        return $objectList;
    }

    public function func_getPatientHistoriesByPatient($patientID)
    {
        $objectList = PatientHistory::where('patient_id', $patientID)->orderBy('created_at', 'DESC')->get();
        return $objectList;
    }

    public function func_getPatientHistory($id)
    {
        $obj = PatientHistory::find($id);
        return $obj;
    }

    public function func_deletePatientHistory($objID)
    {
        PatientHistory::destroy($objID);
        return;
    }
}
