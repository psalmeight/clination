<?php

namespace App\Http\Controllers\Traits;

use Auth;
use App\User;
use App\Models\Clinic;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

trait ClinicTrait
{

  public function func_saveClinic($request)
  {   
      $userAccount = User::find($request->user_id);

      $obj = new Clinic;

      $obj->user_id = $userAccount->getKey();

      $obj->clinic_name = $request->clinic_name;
      $obj->clinic_address = $request->clinic_address;

      $obj->save();

      return $obj->id;
  }

  public function func_getClinic($objID)
  {
    $obj = Clinic::find($objID);
    return $obj->data;
  }

  public function func_getClinics()
  {
      $objList = Clinic::orderBy('created_at')->get();
      return $objList;
  }

  public function func_getClinicsByUser($userID)
  {
    $objList = Clinic::where('user_id', $userID)->with('user')->get();
    return $objList;
  }

  public function func_deleteClinic($objID)
  {
      Clinic::destroy($objID);
      return;
  }
}
