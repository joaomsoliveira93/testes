<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class accessConfirmed extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    private $student,$project,$cab;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($student,$project,$cab)
    {
        $this->student=$student;
        $this->project=$project;
        $this->cab=$cab;
        //dd($project);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject('Aprovação de acesso a Cacifo');
        $this->to($this->student->email);
        return $this->view('mail.accessConfirmed',[
            'student' => $this->student,
            'proj' => $this->project,
            'cab' => $this->cab
        ]);
    }
}
