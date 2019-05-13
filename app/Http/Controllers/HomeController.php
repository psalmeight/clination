<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    function tryLogin(Request $request){
      if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
        $user = User::find(Auth::id());
        $token = $user->createToken($user->email)->accessToken;

        $responseContent = json_encode([
          'status' => 200,
          'access_token' => $token,
          'user_id' => $user->id,
          'user' => $user,
          'message' => 'Successful'
        ]);

        return response($responseContent)
                ->cookie('name', $token, 20160);
      }
      if(Auth::attempt(['username' => $request->email, 'password' => $request->password])){
        $user = User::find(Auth::id());
        $token = $user->createToken($user->email)->accessToken;

        $responseContent = json_encode([
          'status' => 200,
          'access_token' => $token,
          'user_id' => $user->id,
          'user' => $user,
          'message' => 'Successful'
        ]);

        return response($responseContent)
                ->cookie('atk', $token, 20160);
      }
      else{
        return json_encode([
          'status' => 401,
          'message' => 'Unauthorized'
        ]);
      }
    }

    function tryLogout()
    {
      Auth::logout();
    }
}
