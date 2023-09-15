<?php

namespace Database\Seeders;

use App\Models\Locker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Group_Locker extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $x = 0;
        $lockers = Locker::all();
        for ($i=1; $i < 11; $i++) {
            if($lockers[$x]->isFree == 1){
                DB::table('group_locker')->insert([
                    'group_id' => $i,
                    'locker_id' => $lockers[$x]->id,
                ]);
                $lockers[$x]->isFree = 0;
                $lockers[$x]->save();
            }
            $x++;
        }
    }
}
