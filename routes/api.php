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
    Route::get('/user/{id}', 'UsersController@getUser');
    Route::delete('/user/{id}', 'UsersController@deleteUser');

    //Clinics API
    Route::get('/clinics', 'ClinicController@getClinics');
    Route::get('/clinic/{id}', 'ClinicController@getClinic');
    Route::get('/clinics/{user}', 'ClinicController@getClinicsByUser');
});
