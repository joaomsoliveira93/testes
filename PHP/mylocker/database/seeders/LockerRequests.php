<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LockerRequests extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i < 11; $i++) { 
            DB::table('users')->insert([
                'id' => 500+$i,
                'name' => 'User'.$i,
                'email' => 'User'.$i.'@mail.pt',
                'email_verified_at' => now(),
                'password' => Hash::make('User'.$i),
                'pin' => Hash::make('1234'),
                'userType' => 'user',
                'isActive' => '0',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        DB::table('groups')->insert([
            'id' => 501,
            'project_id' => 3,
        ]);

        DB::table('groups')->insert([
            'id' => 502,
            'project_id' => 4,
        ]);

        for($i=1;$i<6;$i++){
            DB::table('group_user')->insert([
                'student_id' => 500+$i,
                'group_id' => 501,
            ]);    
        }

        for($i=6;$i<11;$i++){
            DB::table('group_user')->insert([
                'student_id' => 500+$i,
                'group_id' => 502,
            ]);    
        }


        DB::table('locker_request')->insert([
            'status' => 0,
            'group_id' => 501,
            'locker' =>0,
            'created_at' => now(),
            'updated_at' => now()
        ]); 

        DB::table('locker_request')->insert([
            'status' => 0,
            'group_id' => 502,
            'locker' =>0,
            'created_at' => now(),
            'updated_at' => now()
        ]); 

    }
}
