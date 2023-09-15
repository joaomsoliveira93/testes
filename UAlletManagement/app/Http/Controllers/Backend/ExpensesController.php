<?php

namespace App\Http\Controllers\Backend;

use Auth;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpensesController extends Controller
{
    public function AddExpenseView() {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        return view('backend.expense.add_expense',compact('categorias'));
    }

    public function AddExpenseSubmit(Request $req) {
        try{
            DB::table('expense')->insert([
                'Titulo' => $req -> name,
                'category_id' => $req -> categoria,
                'Montante' => $req -> onlyNum,
                'Data' => $req -> date,
                'Hora' => $req -> time
            ]);          
            $notification = array(
                'message' => "Despesa adicionada com sucesso!",
                'alert-type' => 'success'
            );
            return redirect()->route('expense.list')->with($notification);
        }catch(Exception $e){
            $notification = array(
                'message' => "Não foi possível adiconar a despesa",
                'alert-type' => 'error'
            );
            return redirect()->route('expense.list')->with($notification);
        }
        
    }

    public function EditExpenseView($ex_id) {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        $expense = DB::table('expense')->where('id',$ex_id)->first();
        return view('backend.expense.edit_expense', compact('categorias'),compact('expense'));
    }

    public function EditExpenseSubmit(Request $req, $id) {
        try{
            DB::table('expense')->where('id',$id)->update([
                'Titulo' => $req -> name,
                'category_id' => $req -> categoria,
                'Montante' => $req -> onlyNum,
                'Data' => $req -> date,
                'Hora' => $req -> time
            ]);     
            $id = Auth::user()->id; 
            $notification = array(
                'message' => "Despesa editada com sucesso!",
                'alert-type' => 'success'
            );    
            return redirect()->route('expense.list',compact('id'))->with($notification);
        }catch(Exception $e){
            $id = Auth::user()->id; 
            $notification = array(
                'message' => "Não foi possível editar a despesa!",
                'alert-type' => 'error'
            );    
            return redirect()->route('expense.list',compact('id'))->with($notification);
        }
        
    }

    public function ListExpenseView() {
        $id = Auth::user()->id;   
        $data = DB::table('expense')
            ->join('category', 'expense.category_id', '=', 'category.id')
            ->select('expense.*', 'category.name')
            ->where(
                'category.user_id', $id)            
            ->get();
        return view('backend.expense.list_expense', compact('data'));
    }

    public function ViewExpense($ex_id) {
        $id = Auth::user()->id;
        $categorias = DB::table('category')->where('user_id',$id)->get();
        $expense = DB::table('expense')->where('id',$ex_id)->first();

        return view('backend.expense.expense_details', compact('categorias'),compact('expense'));
    }

    public function DropExpense($ex_id) {
        $id = Auth::user()->id;
        try {
            DB::table('expense')->where('id',$ex_id)->delete();
            $notification = array(
                'message' => "Despesa apagada com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e){
            $notification = array(
                'message' => 'Despesa não foi apagada',
                'alert-type' => 'error'
            );
        }
        return redirect()->route('expense.list', compact('id'))->with($notification);
    }

    public function GetDataGraphExpense() {
        $id = Auth::user()->id;
        $expense = DB::table('expense')
        ->select(
            'expense.Titulo as titExpense',
            'expense.Montante as monExpense'
        )
        ->join(
            'category', 
            'category.id', '=', 'expense.category_id')
        ->where(
            'category.user_id','=', $id)
        ->get();
        return $expense;
    }
}
