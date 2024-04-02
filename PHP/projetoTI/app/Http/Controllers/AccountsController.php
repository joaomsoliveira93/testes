<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\models\fbAccount;
use App\models\linAccount;
use App\models\User;
use App\models\users_studies;
use App\models\Post;

use Auth;
use Exception;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class AccountsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile()
    {

        $fb = fbAccount::where('user_id', Auth::user()->id)->first();
        $lin = linAccount::where('user_id', Auth::user()->id)->first();
        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();

        return View('Profile', compact(['fb', 'lin', 'activeStudies']));
    }

    public function profileUpdate(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required',
            ]);


            User::where('id', Auth::user()->id)->update(['name' => $request->name, 'email' => $request->email]);
            $notification = array(
                'message' => "Dados Atualizados com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e) {

            $notification = array(
                'message' => "Não foi possivel atulizar os dados!",
                'alert-type' => 'error'
            );
        }
        return redirect()->route('profile.view')->with($notification);
    }

    public function changePassword(Request $req)
    {
        $validated = $req->validate([
            'password' => 'required',
            'newPassword' => 'required',
            'confirmPassword' => 'required'
        ]);
        try {
            $id = Auth::user()->id;
            $user = User::find($id);
            if ($req->newPassword  == $req->confirmPassword) {
                if (Hash::check($req->password, $user->password)) {
                    User::where('id', Auth::user()->id)->update(['password' => Hash::make($req->newPassword)]);
                    $notification = array(
                        'message' => "A palavra-passe foi alterada com sucesso!",
                        'alert-type' => 'success'
                    );
                } else {
                    $notification = array(
                        'message' => "Errou a palavra-passe atual!",
                        'alert-type' => 'error'
                    );
                }
            } else {
                $notification = array(
                    'message' => "As novas palavras-passes não coincidem!",
                    'alert-type' => 'error'
                );
            }



            return redirect()->route('profile.view')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível alterar a palavra-passe!",
                'alert-type' => 'error'
            );

            return redirect()->route('profile.view')->with($notification);
        }
    }

    public function allAccounts()
    {
        if (Auth::user()->type == 2) {
            $users = User::with('fbaccounts', 'linaccounts')->get();

            return View('Manage.Users.ManageUsers', compact('users'));
        } else {
            return redirect()->route('home');
        }
    }

    public function searchAccounts(Request $r)
    {
        $name = $r->name;
        $email = $r->email;
        $type = $r->type;
        $active = $r->active;


        if (Auth::user()->type == 2) {
            if ($name == "" && $email == "" && $type == 3 && $active == 3) {
                return redirect()->route('accounts.view');
            } else {
                $users = User::with('fbaccounts', 'linaccounts')
                    ->when($name != "", function ($query) {
                        $query->where('name', 'LIKE', '%' . request('name') . '%');
                    })
                    ->when($email != "", function ($query) {
                        $query->where('email', 'LIKE', '%' . request('email') . '%');
                    })
                    ->when($type != 3, function ($query) {
                        $query->where('type',  request('type'));
                    })
                    ->when($active != 3, function ($query) {
                        $query->where('active', request('active'));
                    })
                    ->get();
            }


            return View('Manage.Users.ManageUsers', compact('users', 'name', 'email', 'type', 'active'));
        } else {
            return redirect()->route('home');
        }
    }

    public function accountDetails($id)
    {
        if (Auth::user()->type == 2) {
            $user = User::with('fbaccounts', 'linaccounts')->where('id', $id)->first();

            return View('Manage.Users.UserDetails', compact('user'));
        } else {
            return redirect()->route('home');
        }
    }

    public function addAccount(Request $request)
    {
        if (Auth::user()->type == 2) {
            try {
                if (user::where('email', $request->email)->first() == null) {
                    $user = new user();
                    $user->name = $request->name;
                    $user->email = $request->email;
                    $user->type = $request->type;
                    $user->active = $request->active;
                    $alias = explode("@", $user->email);
                    $user->password = Hash::make($alias[0]);
                    $user->save();
                    $id = $user->id;
                    $notification = array(
                        'message' => "Utilizador criado com sucesso!",
                        'alert-type' => 'success'
                    );
                    return redirect()->route('user.view', compact('id'))->with($notification);
                }else{
                    $notification = array(
                        'message' => "O E-mail inserido já se encontra registado!",
                        'alert-type' => 'warning'
                    );
                    return redirect()->route('accounts.view')->with($notification);
                }
                
            } catch (Exception $e) {
              
                $notification = array(
                    'message' => "Não foi possivel criar o utilizador!",
                    'alert-type' => 'error'
                );
                return redirect()->route('accounts.view')->with($notification);
            }
        } else {
            return redirect()->route('home');
        }
    }

    public function editAccount(Request $request)
    {
        if (Auth::user()->type == 2) {
            $id = $request->id;
            try {
                $validated = $request->validate([
                    'name' => 'required',
                    'email' => 'required',
                ]);


                User::where('id', $request->id)->update(['name' => $request->name, 'email' => $request->email, 'type' => $request->type, 'active' => $request->active]);
                $notification = array(
                    'message' => "Dados Atualizados com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {

                $notification = array(
                    'message' => "Não foi possivel atulizar os dados!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('user.view', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function resetPassword($id)
    {
        if (Auth::user()->type == 2) {
            try {
                $user = User::find($id);
                $alias = explode("@", $user->email);
                $user->password = Hash::make($alias[0]);
                $user->save();

                $notification = array(
                    'message' => "A palavra-passe foi alterada com sucesso!",
                    'alert-type' => 'success'
                );
                return redirect()->route('user.view', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível alterar a palavra-passe!",
                    'alert-type' => 'error'
                );

                return redirect()->route('user.view', compact('id'))->with($notification);
            }
        } else {
            return redirect()->route('home');
        }
    }
    public function dropAccount($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->id == $id) {
            if ($id == 1) {
                $notification = array(
                    'message' => "Não é possivel apagar o Administrador!",
                    'alert-type' => 'error'
                );
                return redirect()->route('user.view', compact('id'))->with($notification);
            } else {
                try {
                    $user = User::where('id', $id)->first();
                    try {
                        Post::where('user_id', $id)->update(['category_id' => null, 'user_id' => null, 'date' => null]);
                    } catch (Exception $e1) {
                        dd($e1);
                    }

                    $la = linAccount::where('user_id', $user->id)->first();
                    $fa = fbAccount::where('user_id', $user->id)->first();
                    if ($la != null) {
                        $la->delete();
                    }
                    if ($fa != null) {
                        $fa->delete();
                    }
                    $user->delete();
                    if(Auth::user()->id == $id){
                        $notification = array(
                            'message' => "A sua conta foi apagada com sucesso!",
                            'alert-type' => 'success'
                        );
                        Auth::logout();
                        return redirect()->route('login')->with($notification);
                    }else{
                        $notification = array(
                        'message' => "Utilizador apagado com sucesso!",
                        'alert-type' => 'success'
                    );
                    return redirect()->route('accounts.view')->with($notification);
                    }

                    
                } catch (Exception $e) {
                    $notification = array(
                        'message' => "Não foi possivel apagar o utilizador!",
                        'alert-type' => 'error'
                    );
                    return redirect()->route('user.view', compact('id'))->with($notification);
                }
            }
        } else {
            return redirect()->route('home');
        }
    }
}
