<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class AdminController extends Controller
{
    public function Logout(){
            Auth::logout();
            $notification = array(
                'message' => 'Saiu da conta com sucesso',
                'alert-type' => 'warning'
            );
            return Redirect()->route('login')->with($notification);
    }
}
