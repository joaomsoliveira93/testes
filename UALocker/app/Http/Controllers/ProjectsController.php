<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class ProjectsController extends Controller
{
    
    public function manageProjects()
    {

        $id = "";
        $name = "";

        if (Auth::user()->userType == 'manager') {
            $projects = Project::paginate(10);
            
            return view('manageProjects', compact('projects', 'id', 'name'));
        } else {
            return redirect('/mylockers');
        }
    }

    public function searchProject(Request $r)
    {
        $id = $r->mec;
        $name = $r->name;
        if (Auth::user()->userType == 'manager') {
            if ($id == "" && $name == "") {
                return redirect('/projects/all');
            } else {
                $projects = DB::table('projects')
                    ->select('projects.id AS id', 'projects.name AS name')
                    ->where('id', 'LIKE', '%' . $id . '%')
                    ->where('name', 'LIKE', '%' . $name . '%')
                    ->paginate(10);

                return view('manageProjects', compact('projects', 'id', 'name'));
            }
        } else {
            return redirect('/mylockers');
        }
    }

    public function viewProject($id)
    {

        if (Auth::user()->userType == 'manager') {
            $project = Project::find($id);
            
            $teachers = DB::table('project_teacher')
                ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
                ->where('project_id',$id)
                ->get();
            if(count($teachers)==0){
                $allTeachers = DB::table('teachers')
                ->get();
            }else{
                $allTeachers = DB::table('project_teacher')
                ->join('teachers', 'teachers.id', '=', 'project_teacher.teacher_id')
                ->where('project_teacher.project_id','!=' ,$id)
                ->get();   
            }

            return view('viewProject', compact('project','teachers','allTeachers'));
            
        } else {
            return redirect('/mylockers');
        }
    }

    public function addProject(Request $request)
    {
        if (Auth::user()->userType == 'manager') {
        try {
            DB::table('projects')->insert([
                'id' => $request->nmec,
                'name' => $request->name
            ]);
            $notification = array(
                'message' => "Projeto adicionado com sucesso!",
                'alert-type' => 'success'
            );

            return redirect('/projects/all')->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível adicionar o Projeto!",
                'alert-type' => 'error'
            );
            return redirect('/projects/all')->with($notification);
        }
    }else{
        return redirect('/');
    }
    }

    public function editProject(Request $request, $id)
    {
        if (Auth::user()->userType == 'manager') {
        try {
            DB::table('projects')->where('id', $id)->update([
                'name' => $request->name,
            ]);

            $notification = array(
                'message' => 'Os dados do Projeto foram guardados com sucesso!',
                'alert-type' => 'success'
            );

            return redirect()->route('viewproject', compact('id'))->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => 'Não foi possível guardar os dados do Projeto!',
                'alert-type' => 'error'
            );
            return redirect()->route('viewproject', compact('id'))->with($notification);
        }
    }else{
        return redirect('/');
    }
    }

    public function dropproject($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $groups= DB::table('groups')->where('project_id', $id)->get();
                foreach ($groups as $group){
                    
                    $lockers= DB::table('group_locker')->where('group_id', $group->id)->get();
                    
                    
                    foreach ($lockers as $locker){
                        DB::table('lockers')->where('id', $locker->locker_id)->update([
                            'isFree' => 1,
                        ]);
                    }
                DB::table('group_locker')->where('group_id', $group->id)->delete(); 
                }

                DB::table('project_teacher')->where('project_id', $id)->delete();
                DB::table('projects')->where('id', $id)->delete();

                $notification = array(
                    'message' => "A Projeto foi apagado!",
                    'alert-type' => 'success'
                );           
                
                return redirect('/projects/all')->with($notification); 
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível apagar o Projeto!",
                    'alert-type' => 'error'
                );

                return redirect('/projects/all')->with($notification);
            }
        }else{
            return redirect('/');
        }
    }

    public function addProjectTeacher(Request $request,$id){
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('project_teacher')->insert([
                    'project_id' => $id,
                    'teacher_id' => $request->docente,
                ]);

                $notification = array(
                    'message' => 'Docente adicionado ao Projeto com sucesso!',
                    'alert-type' => 'success'
                );

                return redirect()->route('viewproject', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => 'Não foi possível adicionar o docente ao Projeto!',
                    'alert-type' => 'error'
                );
                return redirect()->route('viewproject', compact('id'))->with($notification);
            }
        }else{
            return redirect('/');
        }
    }

    public function dropProjectTeacher($id,$teacherid)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('project_teacher')
                ->where('project_id', $id)
                ->where('teacher_id',$teacherid )
                ->delete();
                $notification = array(
                    'message' => "O Docente foi apagado!",
                    'alert-type' => 'success'
                );           
                
                return redirect()->route('viewproject', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível apagar o Docente!",
                    'alert-type' => 'error'
                );

                return redirect()->route('viewproject', compact('id'))->with($notification);
            }
        }else{
            return redirect('/');
        }
    }
}
