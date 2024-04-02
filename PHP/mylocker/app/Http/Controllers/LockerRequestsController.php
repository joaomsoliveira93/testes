<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Cabinet;
use App\Models\Locker;
use App\Http\Controllers\Exception;
use Illuminate\Support\Facades\Mail;

class LockerRequestsController extends Controller
{
    public function getRequests(){
        if (Auth::user()->userType == 'manager') {
            $reqManager = DB::table('locker_request')
            ->join('groups', 'locker_request.group_id', '=', 'groups.id')
            ->join('projects','groups.project_id','=', 'projects.id')
            ->select('locker_request.id AS id','locker_request.status AS status','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name')
            ->where('locker_request.status',0)
            ->get();
            
            $reqTeacher = DB::table('locker_request')
            ->join('groups', 'locker_request.group_id', '=', 'groups.id')
            ->join('projects','groups.project_id','=', 'projects.id')
            ->select('locker_request.id AS id','locker_request.status AS status','locker_request.locker AS locker','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name')
            ->where('locker_request.status',1)
            ->get();

            $reqCompleted = DB::table('locker_request')
            ->join('groups', 'locker_request.group_id', '=', 'groups.id')
            ->join('projects','groups.project_id','=', 'projects.id')
            ->select('locker_request.id AS id','locker_request.status AS status','locker_request.locker AS locker','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name')
            ->where('locker_request.status',2)
            ->get();

            return view('lockerRequests', compact(['reqManager', 'reqTeacher', 'reqCompleted']));
        } else {
            return redirect('/mylockers');
        }
    }

    public function requestDetails($id)
    {
        if (Auth::user()->userType == 'manager') {
            $reservedLockers = DB::table('locker_request')->select('locker_request.locker as id')->where('status',1)->get();
            $req= DB::table('locker_request')
                ->join('groups', 'locker_request.group_id', '=', 'groups.id')
                ->join('projects','groups.project_id','=', 'projects.id')
                ->select('locker_request.id AS id','locker_request.status AS status','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name')
                ->where('locker_request.id',$id)
                ->first();            

            $tea = DB::table('project_teacher')
                ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
                ->where('project_id',$req->project_id)
                ->get();    

            $mem = DB::table('users')
            ->join('group_user', 'group_user.student_id', '=', 'users.id')
            ->join('groups', 'groups.id', '=', 'group_user.group_id')
            ->where('groups.id',$req->group_id)
            ->get();

            $cabinets = Cabinet::paginate(1);

            $lockers = Locker::all();

            return view('requestDetails', compact(['req', 'tea','mem','cabinets','lockers','reservedLockers']));
        } else {
            return redirect('/mylockers');
        }
    }

    public function requestConfirm($id)
    {
       
            $reservedLockers = DB::table('locker_request')->select('locker_request.locker as id')->where('status',1)->first();
            $req= DB::table('locker_request')
                ->join('groups', 'locker_request.group_id', '=', 'groups.id')
                ->join('projects','groups.project_id','=', 'projects.id')
                ->join('lockers','lockers.id', '=','locker_request.locker')
                ->join('cabinets','cabinets.id','=','lockers.cabinet_id')
                ->select('locker_request.id AS id','locker_request.status AS status','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name','locker_request.locker as locker_id','cabinets.local as local','lockers.position as position')
                ->where('locker_request.id',$id)
                ->first();   
                    

            $tea = DB::table('project_teacher')
                ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
                ->where('project_id',$req->project_id)
                ->get();    
                

            $mem = DB::table('users')
            ->join('group_user', 'group_user.student_id', '=', 'users.id')
            ->join('groups', 'groups.id', '=', 'group_user.group_id')
            ->where('groups.id',$req->group_id)
            ->get();
           
               return view('confirmRequest', compact(['req', 'tea','mem']));         
    }

    public function updateState($id,$locker,$state) {
        if (Auth::user()->userType == 'manager') {
            try{
               
                DB::table('locker_request')->where('id',$id)->update([
                    'status'=> $state,
                    'locker'=> $locker,
                    'updated_at'=> now(),
                ]);

                $req= DB::table('locker_request')
                ->join('groups', 'locker_request.group_id', '=', 'groups.id')
                ->join('projects','groups.project_id','=', 'projects.id')
                ->select('projects.name as project_name','locker_request.id AS id','locker_request.status AS status','locker_request.created_at AS created_at','locker_request.updated_at AS updated_at', 'groups.id AS group_id', 'projects.id AS project_id','projects.name AS name','locker_request.locker as locker_id')
                ->where('locker_request.id',$id)
                ->first();            

                $tea = DB::table('project_teacher')
                    ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
                    ->where('project_id',$req->project_id)
                    ->get();
                forEach($tea as $teacher){
                    Mail::queue(new \App\Mail\confirmRequest($req,$teacher));
                }
                   
    
                $notification = array(
                    'message' => "A requisição do cacifo foi atualizada!",
                    'alert-type' => 'success'
                ); 
    
                return redirect('/locker-requests/all')->with($notification);
            }catch(Exception $e){
                $notification = array(
                    'message' => "Não foi possível atualizar a requisição do cacifo!",
                    'alert-type' => 'error'
                ); 
    
                return redirect('/locker-requests/all')->with($notification);
            }
            
        } else {
            return redirect('/mylockers');
        }
    }

    public function confirmAccess($id,$group_id,$locker) {
        
            $mem = DB::table('users')
            ->join('group_user', 'group_user.student_id', '=', 'users.id')
            ->join('groups', 'groups.id', '=', 'group_user.group_id')
            ->where('groups.id',$group_id)
            ->select('users.id as id','users.name as name','users.email as email')
            ->get();

            $proj = DB::table('groups')
            ->join('projects','projects.id', '=','groups.project_id')
            ->join('project_teacher','project_teacher.project_id', '=','projects.id')
            ->join('teachers','teachers.id', '=','project_teacher.teacher_id')
            ->where('groups.id',$group_id)
            ->select('projects.name AS proj_name','teachers.name as tea_name','teachers.email as email')
            ->get();
            
            $cab = DB::table('lockers')
            ->join('cabinets','cabinets.id','=','lockers.cabinet_id')
            ->where('lockers.id',$locker)
            ->get();
            
            DB::table('locker_request')->where('id',$id)->update([
                'status'=> 2,
                'locker'=> $locker,
                'updated_at'=> now(),
            ]);

            DB::table('group_locker')->insert([
                'group_id'=> $group_id,
                'locker_id'=> $locker,
            ]);

            DB::table('lockers')->where('id',$locker)->update([
                'isFree'=> 0
            ]);

            forEach($mem as $member){
                DB::table('users')->where('id',$member->id)->update([
                    'isActive'=> 1                    
                ]);
                Mail::queue(new \App\Mail\accessConfirmed($member,$proj,$cab));
            }

            $notification = array(
                'message' => "A requisição do cacifo foi atualizada!",
                'alert-type' => 'success'
            ); 
            

            return redirect()->route('home')->with($notification);                    
        
    }

    public function denyAccess($id,$group_id) {
        
        DB::table('locker_request')->where('id',$id)->delete();
        DB::table('group_user')->where('group_id',$group_id)->delete();
        DB::table('groups')->where('id',$group_id)->delete();

        $notification = array(
            'message' => "A requisição do cacifo foi atualizada!",
            'alert-type' => 'success'
        ); 

        return redirect()->route('home')->with($notification);                    
    
}
}
