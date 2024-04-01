<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Project_Teacher extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i < 11; $i++) { 
            DB::table('project_teacher')->insert([
                'project_id' => $i,
                'teacher_id' => $i,
            ]);
        }
    }
}
