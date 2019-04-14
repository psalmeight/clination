<?php

namespace App\Http\Controllers\Traits;

use App\User;
use App\Models\Watcher;
use App\Models\Event;
use App\Models\Friend;
use Auth;
use Illuminate\Support\Facades\Log;

trait UsersTrait
{

  public function func_saveUser($request)
  {
      $obj = new User;

      $sideCheck = User::whereRaw('email = ?', [$request->email])->first();

      if(!empty($sideCheck)){
        return array(
          'error' => true,
          'message' => 'Email is already in use'
        );
      }

      if(!empty($request->user_id)){
        $obj = User::find($request->user_id);
      }
      else {
        $obj->password = bcrypt($request->password);
      }

      $obj->middlename = $request->middlename;
      $obj->firstname = $request->firstname;
      $obj->lastname = $request->lastname;
      $obj->username = $request->username;

      $obj->email = $request->email;
      $obj->contact_no = $request->contact_no;
      $obj->dob = $request->dob;

      $obj->save();

      if(!empty($request->user_id)){
        return $obj;
      }
      
      return $obj->id;
  }

  public function func_getUsers()
  {
      $objectList = User::orderBy('created_at')->get();
      return $objectList;
  }

  public function func_getUser($id)
  {
      $obj = User::find($id);
      return $obj;
  }

  public function func_checkExistingUserValue($request)
  {
    return User::whereRaw('email = ?', [$request->value])->first();
  }

  public function func_deleteUser($objID)
  {
      User::destroy($objID);
      return;
  }
}
