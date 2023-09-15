<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\fbAccount;
use App\Models\linAccount;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Auth;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if ($user == null) {
                $user = new User();
                $user->email = $request->email;
                $user->name = $request->name;
                $user->type = 0;
                $user->active = 0;
                $user->password = Hash::make($request->password);
                $user->save();
                $notification = array(
                    'message' => "Conta criada com sucesso, verifique a caixa de entrada do seu e-mail!",
                    'alert-type' => 'success'
                );

                if ($request->nt == "Facebook") {
                    if (fbAccount::find($request->id) == null) {

                        $fb = new fbAccount;
                        $fb->id = $request->id;
                        $fb->name = $request->name;
                        $fb->email = $request->email;


                        $fb->user_id = $user->id;
                        $fb->save();
                    } else {
                        $notification = array(
                            'message' => "Conta Facebook já associada a um utilizador!",
                            'alert-type' => 'error'
                        );
                    }
                } elseif ($request->nt == 'Linkedin') {
                    if (linAccount::find($request->id) == null) {
                        $lin = new linAccount;
                        $lin->id = $request->id;
                        $lin->name = $request->name;
                        $lin->email = $request->email;

                        $lin->user_id = $user->id;
                        $lin->save();
                    } else {
                        $notification = array(
                            'message' => "Conta Linkedin já associada a um utilizador!",
                            'alert-type' => 'error'
                        );
                    }
                }
            } else {
                $notification = array(
                    'message' => "O e-mail já se enconta associado!",
                    'alert-type' => 'error'
                );
                return redirect()->route('login')->with($notification);
            }

            Mail::send(new \App\Mail\ConfirmEmail($user));
            return redirect()->route('login')->with($notification);
        } catch (Exception $e) {
            dd($e);
        }
    }

    public function confirmEmail($id)
    {
        $user = User::find($id);
        $user->active = 1;
        $user->email_verified_at = now();
        $user->save();
        Auth::login($user);

        $notification = array(
            'message' => "O e-mail foi verificado com sucesso!",
            'alert-type' => 'success'
        );
        return redirect()->route('home')->with($notification);
    }
}
