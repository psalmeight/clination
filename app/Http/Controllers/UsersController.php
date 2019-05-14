<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\UsersTrait;
use Log;

class UsersController extends Controller
{
  use UsersTrait;

  public function saveUser(Request $request)
  {
    $obj = $this->func_saveUser($request);
    return response()->json($obj);
  }

  public function getUsers()
  {
    $objList = $this->func_getUsers();
    return response()->json($objList);
  }

  public function getUserUnique()
  {
    //check here if user is 
    
  }

  public function getUsersExceptMe()
  {
    $objList = $this->func_getUsersExceptMe();
    return response()->json($objList);
  }

  public function checkExistingUserValue()
  {
    $obj = $this->func_checkExistingUserValue();
    return response()->json($obj);
  }

  public function getUser($id){
    $userObj = $this->func_getUser($id);
    return response()->json($userObj);
  }

  public function getDoctorsByClinic($id){
    $doctorsList = $this->func_getDoctorsByClinic($id);
    return response()->json($doctorsList);
  }

  public function deleteUser($id)
  {
    if(empty($id)){
      return response()->json([
        'status' => 400,
        'message' => 'id is required'
      ]);
    }
    else {
      $this->func_deleteUser($id);
      return response()->json([
        'status' => 200,
        'message' => 'success'
      ]);
    }
  }
}
