<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\linAccount;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LinkedinController extends Controller
{

    const DRIVER_TYPE = 'linkedin';

    public function handleLinkedinRedirect()
    {

        return Socialite::driver(static::DRIVER_TYPE)->redirect();
    }

    public function handleLinkedincallback()
    {

        $user = Socialite::driver(static::DRIVER_TYPE)->user();
        if (Auth::check()) {
            try {
                $lin = new linAccount;
                $lin->id = $user->id;
                $lin->name = $user->name;
                $lin->email = $user->email;
                $lin->user_id = Auth::user()->id;
                $lin->save();
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
            $userExisted = linAccount::where('id', $user->id)->first();

            if ($userExisted) {
                $user = new User();

                $user = User::where('id', $userExisted->user_id)->first();


                Auth::login($user);

                return redirect()->route('home');
            } else {

                $network = 'Linkedin';
                return view('auth/register', compact('user', 'network'));
            }
        }
    }

    public function removeAccount($id)
    {
        try {
            $lin = linAccount::where('user_id', $id)->first();
            $lin->delete();
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
