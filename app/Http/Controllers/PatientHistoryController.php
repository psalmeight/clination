<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\PatientHistoryTrait;
use Illuminate\Support\Facades\Log;
use Auth;

class PatientHistoryController extends Controller
{
  use PatientHistoryTrait;

  public function savePatientHistory(Request $request)
  {
    $this->func_savePatientHistory($request);
    return response()->json(200);
  }

  public function getPatientHistories(Request $request)
  {
    $objList = $this->func_getPatientHistories();
    return response()->json($objList);
  }

  public function getPatientHistory($id)
  {
    $objResult = $this->func_getPatientHistory($id);
    return response()->json($objResult);
  }

  public function getPatientHistoriesByPatient($patient_id)
  {
    $objList = $this->func_getPatientHistoriesByPatient($patient_id);
    return response()->json($objList);
  }

  public function deletePatientHistory($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deletePatientHistory($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
