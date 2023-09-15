<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class TeachersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function manageTeachers()
    {
        $id = "";
        $name = "";
        $email = "";

        if (Auth::user()->userType == 'manager') {
            $teachers = Teacher::paginate(10);

            return view('manageTeachers', compact('teachers', 'id', 'name', 'email'));
        } else {
            return redirect('/mylockers');
        }
    }

    public function searchTeacher(Request $r)
    {
        $id = $r->mec;
        $name = $r->name;
        $email = $r->email;


        if (Auth::user()->userType == 'manager') {
            if ($id == "" && $name == "" && $email == "") {
                return redirect('/teachers/all');
            } else {
                $teachers = DB::table('teachers')
                    ->select('teachers.id AS id', 'teachers.name AS name', 'teachers.email AS email')
                    ->where('id', 'LIKE', '%' . $id . '%')
                    ->where('name', 'LIKE', '%' . $name . '%')
                    ->where('email', 'LIKE', '%' . $email . '%')
                    ->paginate(10);

                return view('manageTeachers', compact('teachers', 'id', 'name', 'email'));
            }
        } else {
            return redirect('/mylockers');
        }
    }

    public function viewTeacher($id)
    {

        if (Auth::user()->userType == 'manager') {
            $teacher = Teacher::find($id);

            return view('viewTeacher', compact('teacher'));
        } else {
            return redirect('/mylockers');
        }
    }

    public function addTeacher(Request $request)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                Teacher::create([
                    'id' => $request->nmec,
                    'name' => $request->name,
                    'email' => $request->email
                ]);
                
                $notification = array(
                    'message' => "Docente adicionado com sucesso!",
                    'alert-type' => 'success'
                );

                return redirect('/teachers/all')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível adicionar o docente!",
                    'alert-type' => 'error'
                );
                return redirect('/teachers/all')->with($notification);
            }
        }else{
            return redirect('/');
        }

    }

    public function editTeacher(Request $request, $id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                $teacher = Teacher::find($id);
                $teacher->name = $request->name;
                $teacher->email = $request->email;
                $teacher->save();

                $notification = array(
                    'message' => 'Os dados do docente foram guardados com sucesso!',
                    'alert-type' => 'success'
                );

                return redirect()->route('viewteacher', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => 'Não foi possível guardar os dados do docente!',
                    'alert-type' => 'error'
                );
                return redirect()->route('viewteacher', compact('id'))->with($notification);
            }
        }else{
            return redirect('/');
        }
    }

    public function dropTeacher($id)
    {
        if (Auth::user()->userType == 'manager') {
            try {
                DB::table('project_teacher')->where('teacher_id', $id)->delete();  
                
                Teacher::find($id)->delete();
                $notification = array(
                    'message' => "A docente foi apagado!",
                    'alert-type' => 'success'
                );           
                
                return redirect('/teachers/all')->with($notification); 
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possível apagar o docente!",
                    'alert-type' => 'error'
                );

                return redirect('/teacher/all')->with($notification);
            }
        }else{
            return redirect('/');
        }
    }
}
