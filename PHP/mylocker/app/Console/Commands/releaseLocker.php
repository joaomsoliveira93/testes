<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use DateTime;

class releaseLocker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:releaseLocker';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Release Locker';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $lockers = DB::table('lockers')->get();
        foreach ($lockers as $locker){  
            $dt = new DateTime();           
             
            if($locker->releaseDate == $dt->format('Y-m-d')){
                DB::table('lockers')->where('lockers.id',$locker->id)->update(['isFree'=>1]);
                DB::table('group_locker')->where('group_locker.locker_id', $locker->id)->delete();
            }
        } 

       
    }
}
