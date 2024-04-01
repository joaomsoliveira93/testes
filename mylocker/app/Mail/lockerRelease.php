<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class lockerRelease extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    private $student;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->student=$user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {              
        $this->subject('Aviso de abertura de Cacifo');        
        $this->to($this->student->email);
        return $this->view('mail.lockerRelease',[
            'student' => $this->student,
        ]);
    }
}
