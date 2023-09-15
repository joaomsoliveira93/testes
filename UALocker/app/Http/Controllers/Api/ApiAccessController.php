<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class ApiAccessController extends Controller
{
    //Aqui será colocado o controlador de acesso aos vários cacifos
    //Verificação do PIN do utilizador com o pin guardado no RaspberryPi do armário
    //Possui acesso ao cacifo e este irá se abrir
    //Deverá retornar um conjunto de dados do tipo json
    public function apiAccess(Request $request, $id, $locker_id)
    {
        $student = User::find($id);
        $group = DB::table('group_user')
            ->join('groups', 'groups.id', '=', 'group_user.group_id')
            ->join('group_locker', 'group_locker.group_id', '=', 'groups.id')
            ->join('lockers', 'lockers.id', '=', 'group_locker.locker_id')
            ->where('group_user.student_id', $id)
            ->where('lockers.id', $locker_id)
            ->get();

        if (Hash::check($request->pin, $student->pin) && !$group->isEmpty()) {
            DB::table('locker_access')->insert([[
                'maded_at' => now(),
                'operation' => 1,
                'student_id' => $id,
                'locker_id' => $locker_id
            ],
            [
                'maded_at' => now()->addMinutes(5),
                'operation' => 0,
                'student_id' => $id,
                'locker_id' => $locker_id
            ]]);
            $status = array('Locker_id' => $locker_id, 'Group_id' => $group[0]->group_id, 'Student_id' => $id, 'Result' => 'The Locker is Open!');        
        } else {
            $status = array('Locker_id' => $locker_id, 'Group_id' => $group[0]->group_id, 'Student_id' => $id, 'Result' => 'Invalid Pin!');        
        }
        dd(json_encode($status));
    }
}
