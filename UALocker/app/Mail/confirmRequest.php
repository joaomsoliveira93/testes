<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class confirmRequest extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    private $req,$teacher;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($req,$teacher)
    {
        $this->req = $req;
        $this->teacher = $teacher;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        $this->subject('Pedido de Aprovação de Cacifo');
        $this->to($this->teacher->email);
        return $this->view('mail.confimRequest',[
            'req' => $this->req,
            'teacher' =>$this->teacher
        ]);
    }
}
