<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Auth;


class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function sendEmail(Request $r)
    {
        try {
            if (User::where('email', $r->email)->first() != null) {
                $notification = array(
                    'message' => "Foi enviado um e-mail para recuperar a sua Palavra-Passe!",
                    'alert-type' => 'success'
                );
                Mail::send(new \App\Mail\ResetPassword($r->email));
                return redirect()->route('login')->with($notification);
            } else {
                $notification = array(
                    'message' => "O endereço de e-mail inserido não é válido!",
                    'alert-type' => 'error'
                );

                return redirect()->route('password.request')->with($notification);
            }
        } catch (Exception $e) {
            dd($e);
        }
    }

    public function resetPage($id)
    {
        $user = User::find($id);
        return view('auth.passwords.reset', compact('user'));
    }

    public function resetPassword(Request $r)
    {
        try {
            $id = $r->id;
            $user = User::find($r->id);
            if ($r->password  == $r->passwordconfirm) {

                $user->password= Hash::make($r->password);
                $user->save();
                $notification = array(
                    'message' => "A palavra-passe foi alterada com sucesso!",
                    'alert-type' => 'success'
                );
                Auth::login($user);
                return redirect()->route('home',)->with($notification);
            } else {
                $notification = array(
                    'message' => "As novas palavras-passes não coincidem!",
                    'alert-type' => 'error'
                );
                
                return redirect()->route('user.resetpassword.page',compact('id'))->with($notification);
            }
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível alterar a palavra-passe!",
                'alert-type' => 'error'
            );

            return redirect()->route('user.resetpassword.page',compact('id') )->with($notification);
        }
    }
}
