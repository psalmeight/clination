<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\ClinicUserTrait;
use Illuminate\Support\Facades\Log;

class ClinicUserController extends Controller
{
  use ClinicUserTrait;

  public function saveClinicUser(Request $request)
  {
    $this->func_saveClinicUser($request);
    return response()->json(200);
  }

  public function getClinicUsers(Request $request)
  {
    $objList = $this->func_getClinicUsers();
    return response()->json($objList);
  }

  public function getClinicUser($id)
  {
    $objResult = $this->func_getClinicUser($id);
    return response()->json($objResult);
  }

  public function getClinicUsersByClinic($clinicID)
  {
    $objList = $this->func_getClinicUsersByClinic($clinicID);
    return response()->json($objList);
  }

  public function deleteClinicUser($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deleteClinicUser($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
