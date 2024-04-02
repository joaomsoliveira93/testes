<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Locker extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i < 11; $i++) { 
            DB::table('lockers')->insert([
                'isFree' => 1,
                'cabinet_id' => 1,
                'position'=>$i,
                'releaseDate'=>now()->addDays(-7)
            ]);
        }
        for ($i=1; $i < 11; $i++) { 
            DB::table('lockers')->insert([
                'isFree' => 1,
                'cabinet_id' => 2,
                'position'=>$i,
                'releaseDate'=>now()->addDays(-7)
            ]);
        }
    }
}
