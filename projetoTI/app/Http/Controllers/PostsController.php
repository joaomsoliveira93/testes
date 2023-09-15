<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Post;
use App\models\Category;
use App\models\Study;
use App\Models\Study_categories;
use App\models\users_studies;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function allPosts()
    {
        $posts = Post::with('categories', 'studies')->get();
        $studyCategories = Study_categories::with('categories')->get();
        
        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();

        return View('Posts.AllPosts', compact('posts', 'activeStudies','studyCategories'));
    }

    public function searchPosts(Request $r)
    {
        $socialNetwork = $r->socialNetwork;
        $study = $r->study;
        if ($r->socialNetwork == 0 && $r->study == 0) {
            return redirect()->route('posts.all');
        } elseif ($r->study == 0) {
            $posts = Post::with('categories', 'studies')->where('social_network', 'LIKE', $r->socialNetwork)->get();
        } elseif ($r->socialNetwork == 0) {
            $posts = Post::with('categories', 'studies')->where('study_id', 'LIKE', $r->study)->get();
        } else {
            $posts = Post::with('categories', 'studies')->where('social_network', 'LIKE', $r->socialNetwork)->where('study_id', 'LIKE', $r->study)->get();
        }

        $activeStudies = users_studies::with('studies')->where('user_id', '=', Auth::user()->id)->get();

        return View('Posts.AllPosts', compact('posts', 'activeStudies', 'socialNetwork', 'study'));
    }

    public function addPost(Request $request)
    {
        try {
            $post = new Post();
            $post->link = $request->link;
            $post->social_network = $request->social_network;
            $post->obs = $request->obs;
            $post->save();
            $id = $post->id;
            $notification = array(
                'message' => "Publicação criado com sucesso!",
                'alert-type' => 'success'
            );
            return redirect()->route('post.manage', compact('id'))->with($notification);
        } catch (Exception $e) {
            $notification = array(
                'message' => "Não foi possivel criar o estudo!",
                'alert-type' => 'error'
            );
            return redirect()->route('posts.manage')->with($notification);
        }
    }


    public function postDetails($id)
    {
        $post = Post::with('categories', 'studies')->find($id);
        $studyCategories = Study_categories::with('categories')->where('study_id', '=', $post->study_id)->get();
        return View('Posts.PostDetails', compact('post', 'studyCategories'));
    }

    public function managePosts()
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $posts = Post::with('categories', 'studies')->get();
            $activeStudies = Study::all();
            return View('Manage.Posts.ManagePosts', compact('posts', 'activeStudies'));
        } else {
            return redirect()->route('home');
        }
    }

    public function searchManagePosts(Request $r)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $socialNetwork = $r->socialNetwork;
            $study = $r->study;
            if ($r->socialNetwork == 0 && $r->study == 0) {
                return redirect()->route('posts.manage');
            } elseif ($r->study == 0) {
                $posts = Post::with('categories', 'studies')->where('social_network', 'LIKE', $r->socialNetwork)->get();
            } elseif ($r->socialNetwork == 0) {
                $posts = Post::with('categories', 'studies')->where('study_id', 'LIKE', $r->study)->get();
            } else {
                $posts = Post::with('categories', 'studies')->where('social_network', 'LIKE', $r->socialNetwork)->where('study_id', 'LIKE', $r->study)->get();
            }

            $activeStudies = Study::all();

            return View('Manage.Posts.ManagePosts', compact('posts', 'activeStudies', 'socialNetwork', 'study'));
        } else {
            return redirect()->route('home');
        }
    }

    public function managePost($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $post = Post::with('categories', 'studies', 'users')->find($id);
            if ($post->studies == null) {
                $studies = Study::all();
                return View('Manage.Posts.ManagePost', compact('post', 'studies'));
            } else {
                return View('Manage.Posts.ManagePost', compact('post'));
            }
        } else {
            return redirect()->route('home');
        }
    }

    public function editPost(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $id = $request->id;
            try {
                Post::where('id', $request->id)->update(['link' => $request->link, 'social_network' => $request->social_network, 'obs' => $request->obs]);

                $notification = array(
                    'message' => "Publicação atualizada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar a publicação!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('post.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function dropPost($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {
                $post = Post::where('id', $id)->first();
                $post->delete();

                $notification = array(
                    'message' => "Publicação apagado com sucesso!",
                    'alert-type' => 'success'
                );
                return redirect()->route('posts.manage')->with($notification);
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel apagar a publicação!",
                    'alert-type' => 'error'
                );
                return redirect()->route('posts.manage', compact('id'))->with($notification);
            }
        } else {
            return redirect()->route('home');
        }
    }

    public function addStudy(Request $request)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            $id = $request->id;
            try {
                if ($request->study_id == 0) {
                    $notification = array(
                        'message' => "Deve selecionar um estudo!",
                        'alert-type' => 'info'
                    );
                } else {
                    Post::where('id', $request->id)->update(['study_id' => $request->study_id]);

                    $notification = array(
                        'message' => "Publicação atualizada com sucesso!",
                        'alert-type' => 'success'
                    );
                }
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar a publicação!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('post.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function dropStudy($id)
    {
        if (Auth::user()->type == 2 || Auth::user()->type == 1) {
            try {
                Post::where('id', $id)->update(['study_id' => null, 'category_id' => null, 'user_id' => null, 'date' => null]);

                $notification = array(
                    'message' => "Publicação atualizada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar a publicação!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('post.manage', compact('id'))->with($notification);
        } else {
            return redirect()->route('home');
        }
    }

    public function addcategory(Request $request)
    {
      
            $id = $request->id;
            try {
                if ($request->category_id == 0) {
                    Post::where('id', $request->id)->update(['category_id' => null, 'user_id' => null, 'date' => null]);
                    $notification = array(
                        'message' => "Resposta Apagada!",
                        'alert-type' => 'info'
                    );
                } else {
                    Post::where('id', $request->id)->update(['category_id' => $request->category_id, 'user_id' => Auth::user()->id, 'date' => now()]);

                    $notification = array(
                        'message' => "Publicação atualizada com sucesso!",
                        'alert-type' => 'success'
                    );
                }
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar a publicação!",
                    'alert-type' => 'error'
                );
            }
            if($request->page=="allPosts"){
                return redirect()->route('posts.all')->with($notification);
            }else{
              return redirect()->route('post.view', compact('id'))->with($notification);  
            }
            
   
    }

    public function dropcategory($id)
    {
       
            try {
                Post::where('id', $id)->update(['category_id' => null, 'user_id' => null, 'date' => null]);

                $notification = array(
                    'message' => "Publicação atualizada com sucesso!",
                    'alert-type' => 'success'
                );
            } catch (Exception $e) {
                $notification = array(
                    'message' => "Não foi possivel atualizar a publicação!",
                    'alert-type' => 'error'
                );
            }
            return redirect()->route('post.manage', compact('id'))->with($notification);
    
    }
}
