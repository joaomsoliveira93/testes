<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Locker_Access extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=2; $i < 7; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $i,
                'locker_id' => '1',
            ]);
        }
        for ($i=7; $i < 12; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 0,
                'student_id' => $i,
                'locker_id' => '2',
            ]);
        }
        for ($i=12; $i < 17; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $i,
                'locker_id' => '3',
            ]);
        }
        for ($i=17; $i < 22; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 0,
                'student_id' => $i,
                'locker_id' => '4',
            ]);
        }
        for ($i=22; $i < 27; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $i,
                'locker_id' => '5',
            ]);
        }
        for ($i=27; $i < 32; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 0,
                'student_id' => $i,
                'locker_id' => '6',
            ]);
        }
        for ($i=32; $i < 37; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $i,
                'locker_id' => '7',
            ]);
        }
        for ($i=37; $i < 42; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 0,
                'student_id' => $i,
                'locker_id' => '8',
            ]);
        }
        for ($i=42; $i < 47; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $i,
                'locker_id' => '9',
            ]);
        }for ($i=47; $i < 52; $i++) { 
            DB::table('locker_access')->insert([
                'id' => $i,
                'maded_at' => now(),
                'operation' => 0,
                'student_id' => $i,
                'locker_id' => '10',
            ]);
        }
    }
}
