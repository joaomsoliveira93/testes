<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function ProfileView(){
        $id = Auth::user()->id;
        $user = User::find($id);
        $data = DB::table('category')->where('user_id',$id)->get();
        return view('backend.user.view_profile', compact('user'), compact('data'));
    }

    public function ProfileEdit(){
        $id = Auth::user()->id;
        $editData = User::find($id);
        return view('backend.user.edit_profile', compact('editData'));
    }

    public function ProfileStore(Request $request){
        $tipo_user = Auth::user()->usertype;
        $data = User::find(Auth::user()->id);
        $data->name = $request->name;
        $data->email = $request->email;
        $data->mobile = $request->mobile;
        $data->address = $request->address;
        if($request->file('image')) {
            $file = $request->file('image');
            @unlink(public_path('upload/user_images/'.$data->image));
            $filename = date('YMDHi').$file->getClientOriginalName();
            $file->move(public_path('upload/user_images'), $filename);
            $data['image'] = $filename;
        }
        $data->save();
        $notification = array(
            'message' => 'Perfil Alterado com Sucesso',
            'alert-type' => 'success'
        );
        if (strcmp($tipo_user,'Admin')==0) {
            return redirect()->route('user.view')->with($notification); 
        }else{
            return redirect()->route('profile.view')->with($notification);
        }
          
    }

    public function PasswordView(){
        return view('backend.user.edit_password');
    }

    public function PasswordUpdate(Request $request){
        $validateData = $request->validate([
            // Unique email in users table, check for repeated
            'oldpassword' => 'required',
            'password' => 'required|confirmed'
        ]);

        $hashedPassword = Auth::user()->password;
        if(Hash::check($request->oldpassword, $hashedPassword)){
            $user = User::find(Auth::id());
            $user->password = Hash::make($request->password);
            $user->save();
            Auth::logout();
            $notification = array(
                'message' => 'Password Alterada com Sucesso',
                'alert-type' => 'success'
            );
            return redirect()->route('login')->with('mensagem_sucesso', 'Password Actualizada com Sucesso! Por Favor Reintroduza as Suas Credênciais.');
        }else{
            $notification = array(
                'message' => 'A Password Atual está errada!',
                'alert-type' => 'error'
            );
            return redirect()->back()->with($notification);
        };

    }

    public function AddCategoryView() {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $notification = array(
            'message' => 'Categoria inserida com sucesso',
            'alert-type' => 'success'
        );  
        return view('backend.user.add_category', compact('id'))->with($notification);
    }

    public function AddCategorySubmit(Request $req){
        try{
            $id = Auth::user()->id;
            $user = User::find($id);
            if ( strcmp($req->name, "Crypto") != 0) {
                DB::table('category')->insert([
                'name' => $req->name,
                'user_id' => $user->id
                ]);
                $notification = array(
                'message' => 'Categoria adicionada com sucesso',
                'alert-type' => 'success'
                );
            }
            else {
                $notification = array(
                    'message' => 'Não pode adicionar a categoria com o nome "Crypto"',
                    'alert-type' => 'error');
            }
            return redirect()->route('profile.view')->with($notification);
        }catch(Exception $e){
            $notification = array(
                'message' => 'Não foi possível adicionar a categoria',
                'alert-type' => 'error'
            );
            
            return redirect()->route('profile.view')->with($notification);
        }
        
    }

    public function DropCategory($id)
    {
        $categoryName = DB::table('category')->where('id', $id)->get('name')[0];
        try{
            if (strcmp($categoryName, "Crypto") != 0) {
                DB::table('investment')->where('category_id', $id)->delete();
                DB::table('revenue')->where('category_id', $id)->delete();
                DB::table('expense')->where('category_id', $id)->delete();
                DB::table('category')->where('id',$id)->delete();
                $notification = array(
                    'message' => 'Categoria removida com Sucesso!',
                    'alert-type' => 'success'
                );
            }
        }catch(Exception $e){
            $notification = array(
                'message' => 'Não foi possível remover a Categoria',
                'alert-type' => 'error'
            );
        }
        return redirect()->route('profile.view')->with($notification);
    }

    public function EditCategoryView($catID) {
        $categoria = DB::table('category')->where('id',$catID)->first();
        return view('backend.user.edit_category', compact('categoria'));
    }

    public function EditCategorySubmit(Request $req, $id){
        $categoryName = DB::table('category')->where('id', $id)->get('name')[0];
        if (strcmp($categoryName->name, "Crypto") != 0) {
            DB::table('category')->where('id', $id)->update([
                'name' => $req->name
            ]);
            $notification = array(
                'message' => 'Categoria editada com sucesso',
                'alert-type' => 'success'
            );    
        } else {
            $notification = array(
                'message' => 'Categoria não pode ser editada!',
                'alert-type' => 'error'
            );
        }
                
        return redirect()->route('profile.view')->with($notification);
    }

    public function DropAccount(){
        $id = Auth::user()->id;
        $categorias = DB::table("category")->where("user_id",$id)->get();
        foreach($categorias as $cat){
            DB::table('investment')->where('category_id', $cat->id)->delete();
            DB::table('revenue')->where('category_id', $cat->id)->delete();
            DB::table('expense')->where('category_id', $cat->id)->delete();
            DB::table('category')->where('id',$cat->id)->delete();
        }
        DB::table('users')->where('id',$id)->delete();

        $notification = array(
            'message' => 'Conta apagada com sucesso',
            'alert-type' => 'info'
        );
        return redirect()->route('admin.logout')->with($notification);
    }

    public function GetDataGraphInvCategory() {
        $id = Auth::user()->id;
        $category = DB::table('investment')
        ->select(
            DB::raw('SUM(investment.Montante) as totalInv'),
            'category.name as catName'
        )
        ->join(
            'category', 
            'category.id', '=', 'investment.category_id')
        ->where(
            'category.user_id','=', $id)
        ->groupBy('category.name')
        ->get();
        return $category;
    }

    public function GetDataGraphDespCategory() {
        $id = Auth::user()->id;
        $category = DB::table('expense')
        ->select(
            DB::raw('SUM(expense.Montante) as totalDesp'),
            'category.name as catName'
        )
        ->join(
            'category', 
            'category.id', '=', 'expense.category_id')
        ->where(
            'category.user_id','=', $id)
        ->groupBy('category.name')
        ->get();
        return $category;
    }

    public function GetDataGraphRevenue() {
        $id = Auth::user()->id;
        $category = DB::table('revenue')
            ->select(
                DB::raw('SUM(revenue.Montante) as totalCate'),
                'category.name as catName'
            )
            ->join(
                'category', 
                'category.id', '=', 'revenue.category_id')
            ->where(
                'category.user_id','=', $id)
            ->groupBy('category.name')
            ->get();
        return $category;
    }
}
