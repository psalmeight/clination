<?php

namespace App\Http\Controllers\Traits;

use Auth;
use App\User;
use App\Models\Clinic;
use App\Models\ClinicUser;

use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

trait ClinicTrait
{
  use ClinicUserTrait;

  public function func_saveClinic($request)
  {   
      $userAccount = User::find(Auth::user()->id);

      $obj = new Clinic;

      $obj->user_id = $userAccount->getKey();

      $obj->clinic_name = $request->clinic_name;
      $obj->clinic_address = $request->clinic_address;
      $obj->clinic_contact = $request->clinic_contact;

      $obj->save();

      $obj2 = new ClinicUser;

      $obj2->user_id = Auth::user()->id;
      $obj2->clinic_id = $obj->id;

      $obj->save();

      return $obj->id;
  }

  public function func_getClinic($objID)
  {
    $obj = Clinic::find($objID);
    return $obj;
  }

  public function func_getClinics()
  {
      $objList = Clinic::orderBy('created_at')->get();
      return $objList;
  }
  
  public function func_getClinicsByUser($userID)
  {
    $objList = [];

    if(Auth::user()->role === 'MAIN_OWNER'){
      $objList = Clinic::where('user_id', $userID)->with('user')->get();
    }
    else {
      $cuList = $this->func_getClinicUsersByUser(Auth::user()->id);

      if(count($cuList) > 0){
        foreach($cuList as $cu){
          $clinic = $this->func_getClinic($cu->clinic_id);
          array_push($objList, $clinic);
        }
      }
    }

    return $objList;
  }

  public function func_deleteClinic($objID)
  {
      Clinic::destroy($objID);
      return;
  }
}
