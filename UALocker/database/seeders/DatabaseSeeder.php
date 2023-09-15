<?php

namespace Database\Seeders;

use App\Models\Cabinet;
use App\Models\Group;
//use App\Models\Locker;
use App\Models\Project;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Cabinet::factory(2)->create();
        //Locker::factory(10)->create();
        Project::factory(10)->create();
        Group::factory(10)->create();
        Teacher::factory(10)->create();
        $this -> call([Users::class,
        Locker::class,
        Project_Teacher::class,
        Group_Locker::class,
        Group_User::class,
        Locker_Access::class,
        LockerRequests::class]);
    }
}
