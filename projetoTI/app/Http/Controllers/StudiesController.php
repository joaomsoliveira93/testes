<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Study;
use App\models\Study_categories;
use App\models\users_studies;
use App\models\Category;
use App\models\Post;
use Auth;

class StudiesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function allStudies()
    {
        $studies = Study::all();
        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();

        $categories = Category::all();

        return View('Studies.AllStudies', compact('studies', 'categories', 'activeStudies'));
    }

    public function searchStudies(Request $r)
    {
        $name = $r->name;

        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();

        $categories = Category::all();

        if ($r->name == "") {
            return redirect()->route('studies.all');
        } else {
            $studies = Study::where('name', 'LIKE', '%' . $r->name . '%')->get();
        }


        return View('Studies.AllStudies', compact('studies', 'categories', 'activeStudies', 'name'));
    }

    public function studyDetails($id)
    {
        $study = Study::find($id);
        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();
        $studyCategories = Study_categories::where('study_id', '=', $id)->with('categories')->get();
        $posts = Post::where('study_id', '=', $id)->get();
        return View('Studies.StudyDetails', compact('study', 'posts', 'activeStudies', 'studyCategories'));
    }

    public function studyDetailsPost($id, Request $r)
    {
        $socialNetwork = $r->socialNetwork;
        if ($socialNetwork == 0) {
            return redirect()->route('study.view', compact('id'));
        } else {
            $study = Study::find($id);
            $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();
            $studyCategories = Study_categories::where('study_id', '=', $id)->with('categories')->get();
            $posts = Post::where('study_id', '=', $id)->where('social_network', $socialNetwork)->get();
            return View('Studies.StudyDetails', compact('study', 'posts', 'activeStudies', 'studyCategories', 'socialNetwork'));
        }
    }

    public function enterStudy($id, $local)
    {
        try {
            $userStudy = new users_studies();
            $userStudy->study_id = $id;
            $userStudy->user_id = Auth::user()->id;
            $userStudy->save();
            $notification = array(
                'message' => "Participação registada com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possivel registar a sua participação!",
                'alert-type' => 'error'
            );
        }
        if ($local == 'all') {
            return redirect()->route('studies.all')->with($notification);
        } else {
            return redirect()->route('study.view', compact('id'))->with($notification);
        }
    }

    public function exitStudy($id, $local)
    {
        try {
            users_studies::where('study_id', $id)->where('user_id', Auth::user()->id)->delete();
            $notification = array(
                'message' => "Saída registada com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possivel registar a sua saída!",
                'alert-type' => 'error'
            );
        }
        if ($local == 'all') {
            return redirect()->route('studies.all')->with($notification);
        } else {
            return redirect()->route('study.view', compact('id'))->with($notification);
        }
    }

    public function manageStudies()
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $studies = Study::all();
            return View('Manage.Studies.ManageStudies', compact('studies'));
        } else {
            return redirect()->route('home');
        }
    }

    public function manageStudiesSearch(Request $r)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $name = $r->name;


            if ($r->name == "") {
                return redirect()->route('studies.manage');
            } else {
                $studies = Study::where('name', 'LIKE', '%' . $r->name . '%')->get();
            }
        } else {
            return redirect()->route('home');
        }



        return View('Manage.Studies.ManageStudies', compact('studies', 'name'));
    }

    public function addStudy(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {
                $study = new Study();
                $study->name = $request->name;
                $study->obs = $request->obs;
                $study->created_at = $request->start;
                $study->finish_at = $request->end;
                $study->save();
                $id = $study->id;
                $notification = array(
                    'message' => "Estudo criado com sucesso!",
                    'alert-type' => 'success'
                );
                return redirect()->route('study.manage', compact('id'))->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel criar o estudo!",
                    'alert-type' => 'error'
                );
                return redirect()->route('studies.manage')->with($notification);
            }
        } else {
            return redirect()->route('home');
        }
    }

    public function manageStudy($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $study = Study::find($id);
            $posts = Post::where('study_id', '=', $id)->get();
            $studyCategories = Study_categories::where('study_id', '=', $id)->with('categories')->get();
            $categories = Category::all();
            return View('Manage.Studies.ManageStudy', compact('study', 'posts', 'categories', 'studyCategories'));
        } else {
            return redirect()->route('home');
        }
    }

    public function manageStudyPost($id, Request $r)
    {

        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $socialNetwork = $r->socialNetwork;
            if ($socialNetwork == 0) {
                return redirect()->route('study.manage', compact('id'));
            } else {
                $study = Study::find($id);
                $studyCategories = Study_categories::where('study_id', '=', $id)->with('categories')->get();
                $categories = Category::all();
                $posts = Post::where('study_id', '=', $id)->where('social_network', $socialNetwork)->get();
                return View('Manage.Studies.ManageStudy', compact('study', 'posts', 'categories', 'studyCategories', 'socialNetwork'));
            }
        } else {
            return redirect()->route('home');
        }
    }



    public function editStudy(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $id = $request->id;
            try {
                Study::where('id', $request->id)->update(['name' => $request->name, 'obs' => $request->obs, 'created_at' => $request->start, 'finish_at' => $request->end]);

                $notification = array(
                    'message' => "Estudo atualizado com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar o estudo!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('study.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function dropStudy($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {
                $study = Study::where('id', $id)->first();
                $study->delete();

                $notification = array(
                    'message' => "Estudo apagado com sucesso!",
                    'alert-type' => 'success'
                );
                return redirect()->route('studies.manage')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel apagar o estudo!",
                    'alert-type' => 'error'
                );
                return redirect()->route('study.manage', compact('id'))->with($notification);
            }
        } else {
            return redirect()->route('home');
        }
    }

    public function addStudyCategory(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {
                $id = $request->id;
                $studyCategory = Study_categories::where('study_id', $request->id)->where('category_id', $request->category)->first();

                if ($studyCategory == null) {

                    $studyCategory = new Study_categories();
                    $studyCategory->study_id = $request->id;
                    $studyCategory->category_id = $request->category;
                    $studyCategory->save();
                    $notification = array(
                        'message' => "Resposta adicionada com sucesso!",
                        'alert-type' => 'success'
                    );
                } else {
                    $notification = array(
                        'message' => "A Resposta já exite neste estudo!",
                        'alert-type' => 'info'
                    );
                }
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel adicionadar a Resposta!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('study.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function addPosts(Request $r)
    {
        $id=$r->id;
        try {
            for ($i = 0; $i < count($r->link); $i++) {
                $post = new Post();
                $post->link = $r->link[$i];
                $post->social_network = $r->socialNetwork[$i];
                $post->study_id=$id;
                $post->save();
            }
            $notification = array(
                'message' => "Publicações adicionadas com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possível adicionar as Publicações!",
                'alert-type' => 'error'
            );
        }
        return redirect()->route('study.manage', compact('id'))->with($notification);
    }

    public function dropStudyCategory($study_id, $category_id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $id = $study_id;
            try {
                Study_categories::where('study_id', $study_id)->where('category_id', $category_id)->delete();

                $notification = array(
                    'message' => "Resposta eliminada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel eliminar a Resposta!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('study.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }
    public function newCategory(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {

                $id = $request->id;
                $category = new Category();
                $category->name = $request->name;
                $category->save();

                $studyCategory = new Study_categories();
                $studyCategory->study_id = $id;
                $studyCategory->category_id = $category->id;
                $studyCategory->save();
                $notification = array(
                    'message' => "Resposta adicionada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel adicionadar a Resposta!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('study.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }
}
