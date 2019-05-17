<?php

namespace App\Http\Controllers\Traits;

use App\User;
use App\Models\ClinicUser;
use App\Models\Clinic;
use App\Models\Patient;
use Mail;
use Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Traits\ClinicUserTrait;

trait UsersTrait
{

   use ClinicUserTrait;

   public function func_getOwnerDashboardData()
   {
      //clinics, users -own, 

      $clinicCount = Clinic::where('user_id', Auth::user()->id)->count();
      $staffCount = ClinicUser::where('user_id', Auth::user()->id)->count();
      $patientCount = Patient::where('owned_by', Auth::user()->id)->count();

      return array(
         'clinic_count' => $clinicCount,
         'staff_count' => $staffCount,
         'patient_count' => $patientCount
      );
   }

   public function func_saveUser($request)
   {
      $obj = new User;
      $sideCheck = User::whereRaw('email = ?', [$request->email])->first();

      if(!empty($sideCheck)){
         return array(
            'status' => 401,
            'message' => 'Oops. Email is already in use.'
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
         //$obj->username = $request->username;

         $obj->email = $request->email;
         $obj->contact_no = $request->contact_no;
         $obj->dob = $request->dob;

      if(isset($request->ox) && !empty($request->ox)){
         $obj->role = 'MAIN_OWNER';
      }
      else {
         $obj->role = $request->role ? $request->role : "STAFF";
         $obj->owned_by = $request->user()->id;
      }
      
      //$sentMessage = $this->sendVerification($request->email, $request->firstname);

      $obj->save();

      return array("status" => 200, "message" => "Successfully added");
   }

   public function sendVerification($email, $firstname){

      $message_text = 'Please verify your CLINation account by clicking this link';

      Mail::send('email', ['message_text' => $message_text, 'name' =>  $firstname], function($message) use ($email) {
         $message->to($email)->subject('CLINation account verification');
      });

      return 'sent';
   }

   public function func_getUsers()
   {

         $usersList = [];
         $objectList = User::whereRaw('id = ? or owned_by = ?', [Auth::user()->id, Auth::user()->id])->get();

         foreach($objectList as $obj){
         $clinicUsers = $this->func_getClinicUsersByUser($obj->id);
         array_push($usersList, array(
            "user" => $obj,
            "roles" => $clinicUsers
         ));
         }

         return $usersList;
   }

   public function func_getUser($id)
   {
      $obj = User::find($id);
      return $obj;
   }

   public function func_getDoctorsByClinic($clinicID)
   {
      $resultList = [];
      $objList = ClinicUser::where('clinic_id', $clinicID)->with(['clinic','user'])->get();

      foreach($objList as $obj)
      {
         $user = $this->func_getUser($obj->user->id);

         if($obj->user->role == 'DOCTOR' || $obj->user->role == 'MAIN_OWNER')
            array_push($resultList, $user);
      } 

      return $resultList;
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
