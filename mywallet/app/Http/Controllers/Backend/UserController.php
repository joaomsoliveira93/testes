<?php

namespace App\Http\Controllers\Backend;

use Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\User;
use Exception;
use PhpParser\Node\Stmt\Catch_;

class UserController extends Controller
{
    public function UserView() {
        if(Auth::user()->usertype === "Admin"){
            $data['allData'] = User::all();
            return view('backend.user.view_user', $data);
        }else{
            return Redirect()->route('dashboard');
        }
        
    }

    public function UserAdd() {
        if(Auth::user()->usertype === "Admin"){
            return view('backend.user.add_user');
        }else{
            return Redirect()->route('dashboard');
        }
        
    }

    public function UserStore(Request $request) {
        // Validation Area
        try{
            $validateData = $request->validate([
                // Unique email in users table, check for repeated
                'email' => 'required|unique:users',
                'name'=> 'required',
                'usertype' => 'required',
                'password' => 'required',
            ]);
            $data = new User();
            $data->usertype = $request->usertype;
            $data->name = $request->name;
            $data->email = $request->email;
            $data->password = bcrypt($request->password);
            $data->save();
            $notification = array(
                'message' => 'Utilizador Inserido com Sucesso',
                'alert-type' => 'success'
            );
            return redirect()->route('user.view')->with($notification);  
        }catch(Exception $e){
            $notification = array(
                'message' => 'Não foi possível adicionar o utilizador',
                'alert-type' => 'error'
            );
            return redirect()->route('user.view')->with($notification);  
        }
        
    }

    public function UserEdit($id) {
        if(Auth::user()->usertype === "Admin"){
            $editData = User::find($id);
            return view('backend.user.edit_user', compact('editData'));
        }else{
            return Redirect()->route('dashboard');
        }        
    }

    public function UserUpdate(Request $request, $id) {
        try{
            $data = User::find($id);
            $data->usertype = $request->usertype;
            $data->name = $request->name;
            $data->email = $request->email;
            $data->save();
            $notification = array(
                'message' => 'Utilizador Actualizado com Sucesso',
                'alert-type' => 'success'
            );
            return redirect()->route('user.view')->with($notification);
        }Catch(Exception $e){
            $notification = array(
                'message' => 'Não foi possível actualizar o utilizador',
                'alert-type' => 'error'
            );
            return redirect()->route('user.view')->with($notification);
        }
        
    }

    public function UserDelete($id) {
        if(Auth::user()->usertype === "Admin"){
            try{
                $user = User::find($id);
                $user->delete();
                $notification = array(
                    'message' => 'Utilizador Removido com Sucesso',
                    'alert-type' => 'info'
                );
                return redirect()->route('user.view')->with($notification);
            }catch(\Exception $e){
                $notification = array(
                    'message' => 'Não foi possível remover o utilizador',
                    'alert-type' => 'error'
                );
                return redirect()->route('user.view')->with($notification);
            }
            
        }else{
            return Redirect()->route('dashboard');
        }       
    }
}
