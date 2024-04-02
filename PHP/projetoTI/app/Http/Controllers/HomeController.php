<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {        
        if(Auth::user()->active==1 && Auth::user()->type==0){
             return redirect()->route('studies.all');
        }elseif(Auth::user()->active==1 && Auth::user()->type!=0){
            return view('Grafs');
        }else{
            $notification = array(
                'message' => "A sua conta encontra-se Inativa. Por favor valide o seu E-mail ou contacte o administrador do sistema!",
                'alert-type' => 'error'
            );
            Auth::logout();
            return redirect()->route('login')->with($notification);
        }
       
    }
}
