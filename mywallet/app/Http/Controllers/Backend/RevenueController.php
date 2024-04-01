<?php

namespace App\Http\Controllers\Backend;

use Auth;
use App\Models\User;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RevenueController extends Controller
{
    public function AddRevenueView() {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        return view('backend.revenue.add_revenue',compact('categorias'));
    }

    public function AddRevenueSubmit(Request $req) {
        $id = Auth::user()->id;
        try{
            DB::table('revenue')->insert([
                'Titulo' => $req -> name,
                'category_id' => $req -> categoria,
                'Montante' => $req -> onlyNum,
                'Data' => $req -> date,
                'Hora' => $req -> time
            ]);   
            $notification = array(
                'message' => "Receita aadicionada com sucesso!",
                'alert-type' => 'success'
            );       
            
            return redirect()->route('revenue.list',compact('id'))->with($notification);
        }catch(Exception $e){
            $notification = array(
                'message' => "Não foi possível adicionar a receita",
                'alert-type' => 'error'
            );       
            
            return redirect()->route('revenue.list',compact('id'))->with($notification);
        }
        
    }

    public function EditRevenueView($re_id) {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        $revenue = DB::table('revenue')->where('id',$re_id)->first();

        return view('backend.revenue.edit_revenue', compact('categorias'),compact('revenue'));
    }

    public function EditRevenueSubmit(Request $req, $id) {
        $userId = Auth::user()->id; 
        try{
            DB::table('revenue')->where('id',$id)->update([
                'Titulo' => $req -> name,
                'category_id' => $req -> categoria,
                'Montante' => $req -> onlyNum,
                'Data' => $req -> date,
                'Hora' => $req -> time
            ]);        
             
            $notification = array(
                'message' => "Receita editada com sucesso!",
                'alert-type' => 'success'
            );       
            return redirect()->route('revenue.list', $userId)->with($notification);
        }catch(Exception $e){
            $notification = array(
                'message' => "Não foi possível a receita",
                'alert-type' => 'error'
            );       
            return redirect()->route('revenue.list', $userId)->with($notification);
        }
        
    }

    public function ListRevenueView($id) {
        $data = DB::table('revenue')
            ->join('category', 'revenue.category_id', '=', 'category.id')
            ->select('revenue.*', 'category.name')  
            ->where(
                'category.user_id', $id)          
            ->get();
        return view('backend.revenue.list_revenue', compact('data'));
    }

    public function ViewRevenue($re_id) {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        $revenue = DB::table('revenue')->where('id',$re_id)->first();

        return view('backend.revenue.revenue_details', compact('categorias'),compact('revenue'));
    }

    public function DropRevenue($re_id) {
        $id = Auth::user()->id;
        try {
            DB::table('revenue')->where('id',$re_id)->delete();
            $notification = array(
                'message' => "Receita apagada com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e){
            $notification = array(
                'message' => 'Receita não foi apagada',
                'alert-type' => 'error'
            );
        }
        return redirect()->route('revenue.list',compact('id'))->with($notification);
    }
}
