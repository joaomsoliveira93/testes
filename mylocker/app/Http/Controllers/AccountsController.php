<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Exception;

class AccountsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function manageAccounts()
    {
        $id = "";
        $name = "";
        $email = "";
        $type = "";
        $status = "";

        if (Auth::user()->userType == 'manager') {
            $users = DB::table('users')
                ->select('users.id AS id', 'users.name AS name', 'users.email AS email', 'users.userType AS type', 'users.isActive AS isActive')
                ->paginate(10);
            return view('manageAccounts', compact('users', 'id', 'name', 'email', 'type', 'status'));
        } else {
            return redirect('/mylockers');
        }
    }

    public function searchAccounts(Request $r)
    {
        $id = $r->mec;
        $name = $r->name;
        $email = $r->email;
        $type = $r->type;
        $status = $r->status;


        if (Auth::user()->userType == 'manager') {
            if ($id == "" && $name == "" && $email == "" && $type == "" && $status == "") {
                return redirect('/accounts/all');
            } else {
                $users = DB::table('users')
                    ->select('users.id AS id', 'users.name AS name', 'users.email AS email', 'users.userType AS type', 'users.isActive AS isActive')
                    ->where('id', 'LIKE', '%' . $id . '%')
                    ->where('name', 'LIKE', '%' . $name . '%')
                    ->where('email', 'LIKE', '%' . $email . '%')
                    ->where('userType', 'LIKE', '%' . $type . '%')
                    ->where('isActive', 'LIKE', '%' . $status . '%')
                    ->paginate(10);

                return view('manageAccounts', compact('users', 'id', 'name', 'email', 'type', 'status'));
            }
        } else {
            return redirect('/mylockers');
        }
    }

    public function viewAccount($id)
    {

        if (Auth::user()->userType == 'manager') {
            $account = DB::table('users')
                ->where('users.id', $id)
                ->select('users.id AS id', 'users.name AS name', 'users.email AS email', 'users.userType AS type', 'users.isActive AS isActive')
                ->first();
            return view('viewAccount', compact('account'));
        } else {
            return redirect('/mylockers');
        }
    }

    public function viewProfile()
    {
        $id = Auth::user()->id;
        $user = User::find($id);
        return view('profile', compact('user'));
    }

    public function editProfile(Request $req)
    {
        $id = Auth::user()->id;

        $validated = $req->validate([
            'name' => 'required',
            'email' => 'required|regex:[a-z0-9]+@ua.pt',
        ]);

        try {

            DB::table('users')->where('id', $id)->update([
                'name' => $req->name,
                'email' => $req->email
            ]);

            $notification = array(
                'message' => "Dados guardados com sucesso!",
                'alert-type' => 'success'
            );

            return redirect()->route('profile')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível guardar os dados!",
                'alert-type' => 'error'
            );

            return redirect()->route('profile')->with($notification);
        }
    }

    public function editPassword(Request $req)
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
                    DB::table('users')->where('id', $id)->update([
                        'password' => Hash::make($req->newPassword)
                    ]);
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



            return redirect()->route('profile')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível alterar a palavra-passe!",
                'alert-type' => 'error'
            );

            return redirect()->route('profile')->with($notification);
        }
    }

    public function editPin(Request $req)
    {
        $req->validate([
            'oldpin' => 'required|numeric',
            'newpin' => 'required|numeric',
            'confirmPin' => 'required|numeric'
        ]);


        $id = Auth::user()->id;
        $user = User::find($id);
        try {

            if ($req->newpin == $req->confirmPin) {
                if (Hash::check($req->oldpin, $user->pin)) {
                    DB::table('users')->where('id', $id)->update([
                        'pin' => Hash::make($req->newPin),
                    ]);
                    $notification = array(
                        'message' => "Pin alterado com sucesso!",
                        'alert-type' => 'success'
                    );
                } else {
                    $notification = array(
                        'message' => "Errou o pin actual!",
                        'alert-type' => 'error'
                    );
                }
            } else {
                $notification = array(
                    'message' => "Os novos pin's não coincidem!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('profile')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível alterar o pin!",
                'alert-type' => 'error'
            );
            return redirect()->route('profile')->with($notification);
        }
    }

    public function logOut()
    {
        $notification = array(
            'message' => "A sua sessão terminou!",
            'alert-type' => 'success'
        );
        Auth::logout();
        return Redirect()->route('login')->with($notification);
    }

    public function addAccount(Request $request)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $alias = explode("@", $request->email);
                DB::table('users')->insert([
                    'id' => $request->nmec,
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($alias[0] . $request->nmec),
                    'pin' => Hash::make('0000'),
                    'userType' => $request->type,
                    'isActive' => $request->status
                ]);
                $notification = array(
                    'message' => "Conta adicionada com sucesso!",
                    'alert-type' => 'success'
                );

                return redirect('/accounts/all')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não Foi possível adicionar a conta!",
                    'alert-type' => 'error'
                );
                return redirect('/accounts/all')->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function editAccount(Request $request, $id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('users')->where('id', $id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'userType' => $request->type,
                    'isActive' => $request->status
                ]);

                $notification = array(
                    'message' => 'Os dados da conta foram guardados com sucesso!',
                    'alert-type' => 'success'
                );

                return redirect()->route('viewaccount', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => 'Não foi possível guardar os dados da conta!',
                    'alert-type' => 'error'
                );
                return redirect()->route('viewaccount', compact('id'))->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function dropAccount($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('group_user')->where('student_id', $id)->delete();
                DB::table('locker_access')->where('student_id', $id)->delete();
                DB::table('users')->where('id', $id)->delete();

                $notification = array(
                    'message' => "A conta do utilizador foi apagada!",
                    'alert-type' => 'success'
                );

                return redirect('/accounts/all')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível apagar a conta do utilizador!",
                    'alert-type' => 'error'
                );

                return redirect('/accounts/all')->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function resetPassword($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $user = User::find($id);
                $alias = explode("@", $user->email);
                DB::table('users')->where('id', $id)->update([
                    'password' => Hash::make($alias[0] . $user->id),
                ]);

                $notification = array(
                    'message' => "A palavra-passe do utilizador foi restaurada!",
                    'alert-type' => 'success'
                );
                return redirect()->route('viewaccount', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível foi restaurar a palavra-passe!",
                    'alert-type' => 'error'
                );
                return redirect()->route('viewaccount', compact('id'))->with($notification);
            }
        } else {
            return redirect('/');
        }
    }

    public function resetPin($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $user = User::find($id);
                DB::table('users')->where('id', $id)->update([
                    'pin' => Hash::make('1234'),
                ]);

                $notification = array(
                    'message' => "O pin do utilizador foi restaurado!",
                    'alert-type' => 'success'
                );

                return redirect()->route('viewaccount', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível foi restaurar o pin!",
                    'alert-type' => 'error'
                );

                return redirect()->route('viewaccount', compact('id'))->with($notification);
            }
        } else {
            return redirect('/');
        }
    }
}
