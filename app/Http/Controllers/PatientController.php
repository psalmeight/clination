<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\PatientTrait;
use Illuminate\Support\Facades\Log;
use Auth;

class PatientController extends Controller
{
  use PatientTrait;

  public function savePatient(Request $request)
  {
    $this->func_savePatient($request);
    return response()->json(200);
  }

  public function getPatients(Request $request)
  {
    $objList = $this->func_getPatients();
    return response()->json($objList);
  }

  public function getPatient($id)
  {
    $objResult = $this->func_getPatient($id);
    return response()->json($objResult);
  }

  public function getPatientsByClinic(Request $request, $clinic_id)
  {
    $objList = $this->func_getPatientsByClinic($clinic_id, $request->search);
    return response()->json($objList);
  }

  // public function getPatientsByAttendingPhysician($doctor_id)
  // {
  //   $objList = $this->func_getPatientsByAttendingPhysician($doctor_id);
  //   return response()->json($objList);
  // }

  public function deletePatient($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deletePatient($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
