<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\ClinicTrait;
use Illuminate\Support\Facades\Log;
use Auth;

class ClinicController extends Controller
{
  use ClinicTrait;

  public function saveClinic(Request $request)
  {
    $this->func_saveClinic($request);
    return response()->json(200);
  }

  public function getClinics(Request $request)
  {
    $objList = $this->func_getClinics();
    return response()->json($objList);
  }

  public function getClinic($id)
  {
    $objResult = $this->func_getClinic($id);
    return response()->json($objResult);
  }

  public function getClinicsByLoggedUser()
  {
    Log::info(Auth::user()->id);

    $objList = $this->func_getClinicsByUser(Auth::user()->id);
    return response()->json($objList);
  }

  public function getClinicsByUser($user)
  {
    $objList = $this->func_getClinicsByUser($user);
    return response()->json($objList);
  }

  public function deleteClinic($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deleteClinic($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
