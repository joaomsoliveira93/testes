<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

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

    public function forgotPassword()
    {
        
        return view('auth.passwords.reset');
        
    }

    public function resetPassword(Request $request)
    {
        try {
            $user =DB::table('users')->where('email', $request->email)->first();
           
            $alias = explode("@", $user->email);
            DB::table('users')->where('email', $request->email)->update([
                'password' => Hash::make($alias[0] . $user->id),
            ]);

            Mail::queue(new \App\Mail\forgotPassword($user));

            $notification = array(
                'message' => "A palavra-passe do utilizador foi restaurada!",
                'alert-type' => 'success'
            );
            return redirect()->route('login')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível foi restaurar a palavra-passe!",
                'alert-type' => 'error'
            );
            return redirect()->route('login')->with($notification);
        }
    }    
}
