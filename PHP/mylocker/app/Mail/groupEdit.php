<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class groupEdit extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    private $student,$project,$status;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($project,$student,$status)
    {
        $this->student=$student;
        $this->project=$project;
        $this->status=$status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if($this->status == 'drop'){
            $this->subject('Conta removida');
        }else{
            $this->subject('Conta adicionada');
        }
        
        $this->to($this->student->email);
        return $this->view('mail.groupEdit',[
            'student' => $this->student,
            'proj' => $this->project,
            'status' => $this->status
        ]);
    }
}
