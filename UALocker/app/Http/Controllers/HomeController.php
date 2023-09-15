<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        if(Auth::user()->isActive==1){
            if(Auth::user()->userType == "manager"){
                return view('welcome');
            }else{
                $id = Auth::user()->id;
            
                $mylockers = DB::table('lockers')
                    ->join('group_locker', 'lockers.id', '=', 'group_locker.locker_id')
                    ->join('groups', 'groups.id', '=', 'group_locker.group_id')
                    ->join('projects', 'projects.id', '=', 'groups.project_id')
                    ->join('group_user', 'group_user.group_id', '=', 'groups.id')
                    ->join('cabinets','cabinets.id','=','lockers.cabinet_id')
                    ->where('group_user.student_id', $id)
                    ->select('lockers.*', 'groups.id AS group_id','cabinets.local as local', 'projects.name AS project_name')
                    ->get();
                
                $members = DB::table('users')
                    ->join('group_user', 'group_user.student_id', '=', 'users.id')
                    ->join('groups', 'groups.id', '=', 'group_user.group_id')
                    ->select('users.id AS user_id', 'users.name AS name', 'users.email AS email', 'groups.id AS group_id')
                    ->get();
                
                
                return view('mylockers', compact(['mylockers', 'members']));

            }

        }else{
            $notification = array(
                'message' => "A sua conta encontra-se inativa.Por favor contacte o seu Docente!",
                'alert-type' => 'warning'
            );

            Auth::logout();
            return Redirect()->route('login')->with($notification);
        }
        
    }
}
