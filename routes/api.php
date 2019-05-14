<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('api')->group(function(){
    Route::post('/trylogin', 'HomeController@tryLogin');
    Route::post('/trylogout', 'HomeController@tryLogout');
    Route::post('/user', 'UsersController@saveUser');
    Route::get('/user/checkvalues', 'UsersController@checkExistingUserValue');
});

Route::prefix('/v1')->middleware(['auth:api'])->group(function () {

    //Users API
    Route::get('/users', 'UsersController@getUsers');
    Route::get('/users/clinic_doctors/{id}', 'UsersController@getDoctorsByClinic');
    Route::get('/user/{id}', 'UsersController@getUser');
    Route::delete('/user/{id}', 'UsersController@deleteUser');

    //Clinics API
    Route::post('/clinic', 'ClinicController@saveClinic');
    Route::get('/clinics', 'ClinicController@getClinics');
    Route::get('/clinics/own', 'ClinicController@getClinicsByLoggedUser');
    Route::get('/clinic/{id}', 'ClinicController@getClinic');
    Route::delete('/clinic/{id}', 'ClinicController@deleteClinic');
    Route::get('/clinics/{user}', 'ClinicController@getClinicsByUser');

    //ClinicUsers API
    Route::post('/clinic_user', 'ClinicUserController@saveClinicUser');
    Route::get('/clinic_users', 'ClinicUserController@getClinicUsers');
    Route::get('/clinic_user/{id}', 'ClinicUserController@getClinicUser');
    Route::get('/clinic_users/{clinic}', 'ClinicUserController@getClinicUsersByClinic');
    Route::delete('/clinic_user/{id}', 'ClinicUserController@deleteClinicUser');

    //Patients API
    Route::post('/patient', 'PatientController@savePatient');
    Route::get('/patient/{id}', 'PatientController@getPatient');
    Route::delete('/patient/{id}', 'PatientController@deletePatient');
    Route::get('/patients', 'PatientController@getPatients');
    Route::get('/patient/{id}', 'PatientController@getPatientsByClinic');
});
