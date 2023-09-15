<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => '00001',
            'name' => 'Administrator',
            'email' => 'admin@ua.pt',
            'email_verified_at' => now(),
            'password' => Hash::make('adminadmin'),
            'pin' => Hash::make('1234'),
            'userType' => 'manager',
            'isActive' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        for ($i=2; $i < 52; $i++) { 
            DB::table('users')->insert([
                'id' => $i,
                'name' => 'Student'.$i,
                'email' => 'student'.$i.'@ua.pt',
                'email_verified_at' => now(),
                'password' => Hash::make('student'.$i),
                'pin' => Hash::make('1234'),
                'userType' => 'student',
                'isActive' => '1',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
