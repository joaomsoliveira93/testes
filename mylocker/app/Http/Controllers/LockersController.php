<?php

namespace App\Http\Controllers;

use App\Models\Cabinet;
use App\Models\Locker;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

//use Session;
use Exception;

class LockersController extends Controller

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

    //FUNCIONAL
    public function getAllLockers()
    {
        if (Auth::user()->userType == 'manager') {
            $cabinets = Cabinet::paginate(1);

            $lockers = Locker::all();

            $members = DB::table('users')
                ->join('group_user', 'group_user.student_id', '=', 'users.id')
                ->join('groups', 'groups.id', '=', 'group_user.group_id')
                ->select('users.id AS user_id', 'users.name AS name', 'users.email AS email', 'groups.id AS group_id')
                ->get();

            $projects = DB::table('projects')
                ->join('groups', 'projects.id', '=', 'groups.project_id')
                ->join('group_locker', 'group_locker.group_id', '=', 'groups.id')
                ->select('projects.name AS project_name', 'groups.id AS group_id', 'group_locker.locker_id AS locker_id')
                ->get();

            return view('cabinetStatus', compact(['lockers', 'members', 'cabinets', 'projects']));
        } else {
            return redirect('/mylockers');
        }
    }

    //FUNCIONAL
    public function getMyLockers()
    {

        if (Auth::user()->userType == 'student') {
            $id = Auth::user()->id;

            $mylockers = DB::table('lockers')
                ->join('group_locker', 'lockers.id', '=', 'group_locker.locker_id')
                ->join('groups', 'groups.id', '=', 'group_locker.group_id')
                ->join('projects', 'projects.id', '=', 'groups.project_id')
                ->join('group_user', 'group_user.group_id', '=', 'groups.id')
                ->join('cabinets', 'cabinets.id', '=', 'lockers.cabinet_id')
                ->where('group_user.student_id', $id)
                ->select('lockers.*', 'groups.id AS group_id', 'cabinets.local as local', 'projects.name AS project_name')
                ->get();

            $members = DB::table('users')
                ->join('group_user', 'group_user.student_id', '=', 'users.id')
                ->join('groups', 'groups.id', '=', 'group_user.group_id')
                ->select('users.id AS user_id', 'users.name AS name', 'users.email AS email', 'groups.id AS group_id')
                ->get();


            return view('mylockers', compact(['mylockers', 'members']));
        } else {
            return redirect('/home');
        }
    }

    //FUNCIONAL
    public function getALocker($id)
    {
        $loc = DB::table('lockers')
            ->join('group_locker', 'lockers.id', '=', 'group_locker.locker_id')
            ->join('groups', 'groups.id', '=', 'group_locker.group_id')
            ->join('projects', 'projects.id', '=', 'groups.project_id')
            ->join('cabinets', 'cabinets.id', '=', 'lockers.cabinet_id')
            ->where('lockers.id', $id)
            ->select('lockers.id AS id', 'cabinets.local as local', 'lockers.position as position','lockers.isFree as isFree','lockers.releaseDate as releaseDate', 'groups.id AS group_id', 'projects.name AS project_name', 'projects.id AS project')
            ->first();

        $tea = DB::table('project_teacher')
            ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
            ->where('project_id', $loc->project)
            ->get();

        $allStudents = DB::table('group_user')
            ->join('users', 'users.id', '=', 'group_user.student_id')
            ->where('group_id', '!=', $loc->group_id)
            ->get();


        $mem = DB::table('users')
            ->join('group_user', 'group_user.student_id', '=', 'users.id')
            ->join('groups', 'groups.id', '=', 'group_user.group_id')
            ->select('users.id AS id', 'users.name AS name', 'users.email AS email', 'groups.id AS group_id')
            ->get();


        $acc_info = DB::table('locker_access')
            ->join('lockers', 'lockers.id', '=', 'locker_access.locker_id')
            ->join('users', 'users.id', '=', 'locker_access.student_id')
            ->select('locker_access.*', 'users.name AS user_name', 'users.id AS user_id')
            ->where('locker_access.locker_id',$loc->id)
            ->paginate(9);

        return view('lockerDetails', compact(['loc', 'mem', 'acc_info', 'tea', 'allStudents']));
    }

    //FUNCIONAL
    public function getAccesses()
    {
        $locker = "";
        $name = "";
        $op = "";
        $cab = "";

        $acc_info = DB::table('locker_access')
            ->join('lockers', 'lockers.id', '=', 'locker_access.locker_id')
            ->join('users', 'users.id', '=', 'locker_access.student_id')
            ->join('cabinets', 'cabinets.id', '=', 'lockers.cabinet_id')
            ->select('locker_access.*', 'users.name AS user_name', 'cabinets.id as cab_id', 'cabinets.local as local', 'lockers.position as position')
            ->paginate(10);
        $cabinets = Cabinet::all();

        return view('lockerAccesses', compact(['acc_info', 'locker', 'name', 'op', 'cab', 'cabinets']));
    }

    //FUNCIONAL
    public function searchAccesses(Request $r)
    {
        $locker = $r->locker;
        $name = $r->name;
        $op = $r->op;
        $cab = $r->cab;

        if ($locker == "" && $name == "" && $op == "" && $cab == "") {
            return redirect('/accesses/all');
        }
        $cabinets = Cabinet::all();
        $acc_info = DB::table('locker_access')
            ->join('lockers', 'lockers.id', '=', 'locker_access.locker_id')
            ->join('users', 'users.id', '=', 'locker_access.student_id')
            ->join('cabinets', 'cabinets.id', '=', 'lockers.cabinet_id')
            ->select('locker_access.*', 'users.name AS user_name', 'cabinets.local as local', 'lockers.position as position')
            ->where('lockers.position', 'LIKE', '%' . $locker . '%')
            ->where('users.name', 'LIKE', '%' . $name . '%')
            ->where('locker_access.operation', 'LIKE', '%' . $op . '%')
            ->where('cabinets.id', 'LIKE', '%' . $cab . '%')
            ->paginate(10);
        return view('lockerAccesses', compact(['acc_info', 'locker', 'name', 'op', 'cab', 'cabinets']));
    }

    //FUNCIONAL
    public function releaseLockers()
    {
        if (Auth::user()->userType == 'manager') {
            $cabinets = Cabinet::paginate(1);

            $lockers = Locker::all();

            $members = DB::table('users')
                ->join('group_user', 'group_user.student_id', '=', 'users.id')
                ->join('groups', 'groups.id', '=', 'group_user.group_id')
                ->select('users.id AS user_id', 'users.name AS name', 'users.email AS email', 'groups.id AS group_id')
                ->get();

            $projects = DB::table('projects')
                ->join('groups', 'projects.id', '=', 'groups.project_id')
                ->join('group_locker', 'group_locker.group_id', '=', 'groups.id')
                ->select('projects.name AS project_name', 'groups.id AS group_id', 'group_locker.locker_id AS locker_id')
                ->get();

            return view('releaseLockers', compact(['lockers', 'members', 'cabinets', 'projects']));
        } else {
            return redirect('/mylockers');
        }
    }

    //FUNCIONAL
    public function releaseALocker($id)
    {
        if (Auth::user()->userType == 'manager') {
            $routeName = Session::get('var');
            try {
                /*$locker = Locker::find($id);
                $locker->isFree = 1;
                $locker->save();*/

                $this->releaseLockerEmail($id);
                /*DB::table('group_locker')
                    ->where('group_locker.locker_id', $id)
                    ->delete();*/

                $notification = array(
                    'message' => "O cacifo foi libertado!",
                    'alert-type' => 'success'
                );

                if ($routeName == 'details') {
                    return redirect('/cabinetstatus/view')->with($notification);
                } else {
                    return redirect('/releaselockers/view')->with($notification);
                }
            } catch (Exception $e) {

                $notification = array(
                    'message' => "Não foi possível libertar o cacifo!",
                    'alert-type' => 'error'
                );

                if ($routeName == 'details') {
                    return redirect('/cabinetstatus/view')->with($notification);
                } else {
                    return redirect('/releaselockers/view')->with($notification);
                }
            }
        } else {
            return redirect('/');
        }
    }

    //FUNCIONAL
    public function releaseAllLockers($cabinet_id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $lockers = DB::table('lockers')->where('cabinet_id',$cabinet_id)->get();
                foreach ($lockers as $locker){
                    $this->releaseLockerEmail($locker->id);
                   
                }
                /*DB::table('lockers')
                    ->where('cabinet_id', $cabinet_id)
                    ->update(array('isFree' => '1'));

                DB::table('group_locker')
                    ->join('lockers', 'lockers.id', '=', 'group_locker.locker_id')
                    ->where('lockers.cabinet_id', $cabinet_id)
                    ->delete();*/

                $notification = array(
                    'message' => "O cacifos foram libertados!",
                    'alert-type' => 'success'
                );

                return redirect()->route('releaselockers')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível libertar os cacifos!",
                    'alert-type' => 'error'
                );

                return redirect()->route('releaselockers')->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function releaseLockerEmail($id){
       DB::table('lockers')->where('lockers.id', $id)->update([
            'releaseDate' => now()->addDays(7),
            'isFree' => 2
        ]);

        $data=DB::table('group_locker')
        ->join('group_user','group_user.group_id','=','group_locker.group_id')
        ->join('users','users.id','=','group_user.student_id')
        ->join('groups','groups.id','=','group_locker.group_id')
        ->join('projects','projects.id','=','groups.project_id')
        ->join('lockers','lockers.id','=','group_locker.locker_id')
        ->join('cabinets', 'cabinets.id', '=', 'lockers.cabinet_id')
        ->where('group_locker.locker_id',$id)
        ->select('users.*','projects.name as proj_name','lockers.position as position','cabinets.local as local')
        ->get();
        
        forEach($data as $user){            
            Mail::queue(new \App\Mail\lockerRelease($user));                 
        }
    }

    public function addCabinet(Request $request)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('cabinets')->insert([
                    'local' => $request->local,
                    'coordX' => 0,
                    'coordY' => 0,
                ]);
                $cab = Cabinet::all()->last();


                for ($i = 1; $i <= $request->lockers; $i++) {

                    DB::table('lockers')->insert([
                        'isFree' => 1,
                        'position' => $i,
                        'cabinet_id' => $cab->id,
                        'releaseDate' =>now()->addDays(-7)
                    ]);
                }

                $notification = array(
                    'message' => "O Armário foi adicionado com sucesso!",
                    'alert-type' => 'success'
                );

                return redirect()->route('cabinetstatus')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel adicionar o Armário!",
                    'alert-type' => 'error'
                );

                return redirect()->route('cabinetstatus')->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function dropCabinet($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                
                DB::table('lockers')
                ->join('locker_access','locker_access.locker_id','=','lockers.id')
                ->where('cabinet_id', $id)
                ->delete();
                DB::table('cabinets')->where('id', $id)->delete();


                $notification = array(
                    'message' => "O Armário foi Eliminado com sucesso!",
                    'alert-type' => 'success'
                );

                return redirect()->route('cabinetstatus')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel Eliminar o Armário!",
                    'alert-type' => 'error'
                );

                return redirect()->route('cabinetstatus')->with($notification);
            }
        } else {
            return redirect('/');
        }
    }
}
