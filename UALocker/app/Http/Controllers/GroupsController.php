<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Exception;


class GroupsController extends Controller
{
    public function dropGroupMember($groupid,$memberid,$id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $project = DB::table('groups')
                ->join('projects','projects.id','=', 'groups.project_id')
                ->where('groups.id',$groupid)
                ->first();
                

                $user=User::find($memberid);
                
                Mail::queue(new \App\Mail\groupEdit($project,$user,'drop'));

                DB::table('group_user')
                ->where('group_id', $groupid)
                ->where('student_id',$memberid )
                ->delete();
                $notification = array(
                    'message' => "O Membro foi apagado!",
                    'alert-type' => 'success'
                );           
                
                return redirect()->route('lockerdetails', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível apagar o Membro!",
                    'alert-type' => 'error'
                );

                return redirect()->route('lockerdetails', compact('id'))->with($notification);
            }
        }else{
            return redirect('/');
        }
    }

    public function addGroupMember(Request $request,$groupid,$id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $project = DB::table('groups')
                ->join('projects','projects.id','=', 'groups.project_id')
                ->where('groups.id',$groupid)
                ->first();
                

                $user=User::find($request->student);
                
                Mail::queue(new \App\Mail\groupEdit($project,$user,'add'));

                DB::table('group_user')->insert([
                    'group_id' => $groupid,
                    'student_id' => $request->student,
                ]);
                $notification = array(
                    'message' => "O Membro foi Adicionado!",
                    'alert-type' => 'success'
                );           
                
                return redirect()->route('lockerdetails', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível adicionar o Membro!",
                    'alert-type' => 'error'
                );

                return redirect()->route('lockerdetails', compact('id'))->with($notification);
            }
        }else{
            return redirect('/');
        }
        }
        
}
