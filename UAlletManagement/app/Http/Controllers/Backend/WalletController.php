<?php

namespace App\Http\Controllers\Backend;

use Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    
    public function CryptosView($id) {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $dataCryptos = DB::table('cryptos')
        ->select(
            'cryptos.id',
            'cryptos.Nome',
            'cryptos.Montante',
            'cryptos.DataOrdem',
            'cryptos.HoraOrdem',
            'cryptos.DataFecho',
            'cryptos.HoraFecho',
            'category.name'
        )
        ->join(
            'category', 
            'category.id', '=', 'cryptos.category_id')
        ->where(
            'category.user_id', $id)
        ->get();
        return view('backend.wallet.cryptos', compact('editData'),compact('dataCryptos'));
    }

    public function ResultView($id) {
        $data['allData'] = User::all();
        $dataRevenue = DB::table('revenue')
        ->join('category', 'revenue.category_id', '=', 'category.id')
        ->select('revenue.*', 'category.name')  
        ->where(
            'category.user_id', $id)          
        ->get();
        $dataExpense = DB::table('expense')
        ->join('category', 'expense.category_id', '=', 'category.id')
        ->select('expense.*', 'category.name')  
        ->where(
            'category.user_id', $id)          
        ->get();
        return view('backend.wallet.result', $data, compact('dataRevenue', 'dataExpense'));
    }

    public function InvestmentResultView($id) {
        $data['allData'] = User::all();
        $dataInvestment = DB::table('investment')
        ->select(
            'investment.id',
            'investment.Nome',
            'investment.Montante',
            'investment.DataOrdem',
            'investment.HoraOrdem',
            'investment.DataFecho',
            'investment.HoraFecho',
            'investment.MontanteFinal',
            'category.name'
        )
        ->join(
            'category', 
            'category.id', '=', 'investment.category_id')
        ->where(
            'category.user_id', $id)
        ->get();
        return view('backend.wallet.investment', $data, compact('dataInvestment'));
    }
}
