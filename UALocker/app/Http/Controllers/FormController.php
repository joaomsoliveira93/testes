<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Group;
use Illuminate\Support\Facades\Hash;
class FormController extends Controller
{
    public function index(){
        $projetos=DB::table('projects')->get();
        return view ('auth.register', compact('projetos'));
    }

    public function insertrequest(Request $request){
        $grupo= new Group();
        $grupo->project_id= $request->projetox;
        $grupo->save();
        
        for($i=0;$i<count($request->mec); $i++){
            $alias = explode("@", $request->email[$i]);
            $user=new User();
            $user->id=$request->mec[$i];
            $user->name=$request->name[$i];
            $user->email=$request->email[$i];
            $user->password=Hash::make($alias[0].$user->id);
            $user->pin=Hash::make(1234);
            $user->userType='student';
            $user->isActive=0;
            if(User::find($request->mec[$i])==null){  
                $user->save();
            }
            DB::table('group_user')->insert([
                'student_id' => $request->mec[$i],
                'group_id' => $grupo->id,
            ]);    

        }
        DB::table('locker_request')->insert([
            'status' => 0,
            'group_id' => $grupo->id,
            'locker' =>0,
            'created_at' => now(),
            'updated_at' => now()
        ]); 
        
        $notification = array(
            'message' => "Pedido de cacifo enviado",
            'alert-type' => 'success'
        );

        return redirect()-> route('login')->with($notification);    
    }
}
