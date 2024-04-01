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
            'email' => 'admin@mail.pt',
            'email_verified_at' => now(),
            'password' => Hash::make('Admin123.'),
            'pin' => Hash::make('1234'),
            'userType' => 'manager',
            'isActive' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        for ($i=2; $i < 52; $i++) { 
            DB::table('users')->insert([
                'id' => $i,
                'name' => 'User'.$i,
                'email' => 'User'.$i.'@mail.pt',
                'email_verified_at' => now(),
                'password' => Hash::make('User'.$i),
                'pin' => Hash::make('1234'),
                'userType' => 'user',
                'isActive' => '1',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
