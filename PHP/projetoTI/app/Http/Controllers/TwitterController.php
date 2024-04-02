<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\twtAccount;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class TwitterController extends Controller
{

    CONST DRIVER_TYPE = 'twitter';

    public function handleTwitterRedirect()
    {
        
        return Socialite::driver(static::DRIVER_TYPE)->redirect();
    }

    public function handleTwitterincallback()
    {
        try {
           
            $user = Socialite::driver(static::DRIVER_TYPE)->user();
            
            
            $userExisted = twtAccount::where('id', $user->id)->first();
           
            if( $userExisted ) {
                $user = new User();

                $user=User::where('id', $userExisted->user_id)->first();
      
                
                Auth::login($user);

                return redirect()->route('home');

            }else { 
                
                $network='Twitter';
                return view('auth/register',compact('user','network'));
            }


        } catch (Exception $e) {
            dd($e);
        }

    }
}