<?php

namespace App\Http\Controllers\Traits;

use App\Patient;
use Auth;
use Illuminate\Support\Facades\Log;

trait PatientsTrait
{
  
  public function func_savePatient($request)
  {
      $obj = new Patient;

      $sideCheck = Patient::whereRaw('email = ?', [$request->email])->first();

      if(!empty($sideCheck)){
        return array(
          'error' => true,
          'message' => 'Email is already in use'
        );
      }

      if(!empty($request->user_id)){
        $obj = Patient::find($request->user_id);
      }
      else {
        $obj->password = bcrypt($request->password);
      }

      $obj->middlename = $request->middlename;
      $obj->firstname = $request->firstname;
      $obj->lastname = $request->lastname;
      //$obj->username = $request->username;

      $obj->email = $request->email;
      $obj->contact_no = $request->contact_no;
      $obj->dob = $request->dob;
      $obj->role = $request->role ? $request->role : "";

      $obj->save();

      if(!empty($request->user_id)){
        return $obj;
      }
      
      return $obj->id;
  }

  public function func_getPatients()
  {
      $usersList = [];
      $objectList = Patient::orderBy('created_at')->get();

      foreach($objectList as $obj){
        $clinicPatients = $this->func_getClinicPatientsByPatient($obj->id);
        array_push($usersList, array(
          "user" => $obj,
          "roles" => $clinicPatients
        ));
      }

      return $usersList;
  }

  public function func_getPatient($id)
  {
      $obj = Patient::find($id);
      return $obj;
  }

  public function func_checkExistingPatientValue($request)
  {
    return Patient::whereRaw('email = ?', [$request->value])->first();
  }

  public function func_deletePatient($objID)
  {
      Patient::destroy($objID);
      return;
  }
}
