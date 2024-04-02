<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\fbAccount;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{

    const DRIVER_TYPE = 'facebook';

    public function handleFacebookRedirect()
    {

        return Socialite::driver(static::DRIVER_TYPE)->redirect();
    }

    public function handleFacebookcallback()
    {

        $user = Socialite::driver(static::DRIVER_TYPE)->user();
        if (Auth::check()) {
            try {
                $fb = new fbAccount;
                $fb->id = $user->id;
                $fb->name = $user->name;
                $fb->email = $user->email;
                $fb->user_id = Auth::user()->id;
                $fb->save();
                $notification = array(
                    'message' => "Conta adicionada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel adicionar a conta!",
                    'alert-type' => 'error'
                );
            }

            return redirect()->route('profile.view')->with($notification);
        } else {
            $userExisted = fbAccount::where('id', $user->id)->first();

            if ($userExisted) {
                $user = new User();

                $user = User::where('id', $userExisted->user_id)->first();


                Auth::login($user);

                return redirect()->route('home');
            } else {

                $network = 'Facebook';
                return view('auth/register', compact('user', 'network'));
            }
        }
    }

    public function removeAccount($id)
    {
        try {
            $fb = fbAccount::where('user_id', $id)->first();
            $fb->delete();
            $notification = array(
                'message' => "Conta removida com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possivel remover a conta!",
                'alert-type' => 'error'
            );
        }

        return redirect()->route('profile.view')->with($notification);
    }
}
