<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class forgotPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    private $user,$password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
        $this->password ="";
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $alias = explode("@", $this->user->email);
        $this->password = $alias[0] . $this->user->id;
        $this->subject('Recuperação da palavra-passe');
        $this->to($this->user->email);
        return $this->view('mail.forgotPassword',[
            'user' => $this->user,
            'password' => $this->password
        ]);
    }
}
