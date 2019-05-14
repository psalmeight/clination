<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\PatientVaccinationTrait;
use Illuminate\Support\Facades\Log;
use Auth;

class PatientVaccinationController extends Controller
{
  use PatientVaccinationTrait;

  public function savePatientVaccination(Request $request)
  {
    $this->func_savePatientVaccination($request);
    return response()->json(200);
  }

  public function getPatientVaccinations(Request $request)
  {
    $objList = $this->func_getPatientVaccinations();
    return response()->json($objList);
  }

  public function getPatientVaccination($id)
  {
    $objResult = $this->func_getPatientVaccination($id);
    return response()->json($objResult);
  }

  public function getPatientVaccinationsByPatient($patient_id)
  {
    $objList = $this->func_getPatientVaccinationsByPatient($patient_id);
    return response()->json($objList);
  }

  public function deletePatientVaccination($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deletePatientVaccination($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
