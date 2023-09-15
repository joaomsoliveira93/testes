<?php

namespace App\Http\Controllers\backend;
use Auth;
use Exception;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Symfony\Component\VarDumper\VarDumper;

class InvestmentController extends Controller
{
    public function AddInvestmentView() {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $categorias = DB::table('category')->where('user_id',$id)->get();
        return view('backend.investment.add_investment', compact('editData'),compact('categorias'));
    }

    public function AddInvestmentSubmit(Request $req){
        $id = Auth::user()->id;
        try{
            DB::table('investment')->insert([
                'Nome' => $req->name,
                'Montante' => $req->amount,
                'DataOrdem' => $req->startDate,
                'HoraOrdem' => $req->startTime,
                'DataFecho' => $req->endDate,
                'HoraFecho' => $req->endTime,
                'MontanteFinal' => $req->closeAmount,
                'category_id' => $req->category
            ]);
            $notification = array(
                'message' => "Investimento adicionado com Sucesso!",
                'alert-type' => 'success'
            );
            return redirect()->route('investment.list', $id)->with($notification);
        }catch(Exception $e){
            $notification = array(
                'message' => "Não foi possível adicionar o investimento",
                'alert-type' => 'error'
            );
            return redirect()->route('investment.list', $id)->with($notification);
        }
    }
    
    public function EditInvestmentView($investmentId) {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $userInvestment = DB::table('investment')
        ->select(
            'investment.id as id',
            'investment.Nome as name',
            'investment.Montante as amount',
            'investment.DataOrdem as startDate',
            'investment.HoraOrdem as startTime',
            'investment.DataFecho as endDate',
            'investment.HoraFecho as endTime',
            'investment.MontanteFinal as endAmount',
            'category.id as catId',
            'category.name as catName'
        )
        ->join(
            'category', 
            'category.id', '=', 'investment.category_id')
        ->where(
            'investment.id', $investmentId
        )
        ->get();

        $userCategories = DB::table('category')
        ->select(
            'id',
            'name'
        )
        ->get();

        return view('backend.investment.edit_investment_details', compact('userInvestment'), compact('userCategories'));
    }

    public function EditInvestmentSubmit(Request $req, $investmentId) {
        $id = Auth::user()->id;
        try{

        }catch(Exception $e){
            
        }
        $investment = DB::table('investment')->select(
            'Nome',
            'Montante',
            'DataOrdem',
            'HoraOrdem',
            'DataFecho',
            'HoraFecho',
            'MontanteFinal',
            'category_id'
            )
            ->where('investment.id', '=', $investmentId)
            ->get()[0];
        
        $updateInvestment = DB::table('investment')->where('investment.id', '=', $investmentId);

        $newCat = $req->category;
        $newName = $req->name;
        $newAmount = $req->amount;
        $newEndAmount = $req->endAmount;
        $newStartDate = $req->startDate;
        $newStartTime = $req->startTime; //HoraOrdem
        $newEndDate = $req->endDate; //DataFecho
        $newEndTime = $req->endTime; //HoraFecho
        $alertMessage = "Alertas:";

        if($newCat != $investment->category_id) {
            $updateInvestment->update(['category_id' => $newCat]);
        }
        if($newName != $investment->Nome && $newName != NULL) {
            $updateInvestment->update(['Nome' => $newName]);
        }
        if($newAmount != $investment->Montante && $newAmount != NULL) {
            $updateInvestment->update(['Montante' => $newAmount]);
        }
        if($newEndAmount != $investment->MontanteFinal && $newEndAmount != null) {
            $updateInvestment->update(['MontanteFinal' => $newEndAmount]);
        }
        if($newStartDate != $investment->DataOrdem) {
            if (Date($newStartDate) <= Date($newEndDate) || Date($newStartDate) == Date($newEndDate) && Date($newStartTime) > Date($newEndTime)) {
                $updateInvestment->update(['DataOrdem' => $newStartDate]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Data de Ordem não foi alterada!";
                
            }
        }
        if($newStartTime != $investment->HoraOrdem) {
            if((Date($newStartDate) == Date($newEndDate) && Date($newStartTime) < Date($newEndTime)) || (Date($newStartDate) < Date($newEndDate))) {
                $updateInvestment->update(['HoraOrdem' => $newStartTime]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Hora de Ordem não foi alterada!";
            }
            
        }
        if($newEndDate != $investment->DataFecho) {
            if (Date($newStartDate) <= Date($newEndDate) || Date($newStartDate) == Date($newEndDate) && Date($newStartTime) > Date($newEndTime)) {
                $updateInvestment->update(['DataFecho' => $newEndDate]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Data de Fecho não foi alterada!";
            }
        }
        if($newEndTime != $investment->HoraFecho) {
            if((Date($newStartDate) == Date($newEndDate) && Date($newStartTime) < Date($newEndTime)) || (Date($newStartDate) < Date($newEndDate))) {
                $updateInvestment->update(['HoraFecho' => $newEndTime]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Hora de Ordem não foi alterada!";
            }
        }

        
        if (strcmp($alertMessage, "Alertas:") !== 0) {
            $notification = array(
                'message' => $alertMessage,
                'alert-type' => 'error'
            );
            return redirect()->route('investment.list', $id)->with($notification);
        }
        $notification = array(
            'message' => 'Investimento editado com sucesso',
            'alert-type' => 'success'
        );  
        return redirect()->route('investment.list', $id)->with($notification);
    }

    public function ListInvestmentView($id) {
        $data['allData'] = User::all();
        $userInvestments = DB::table('investment')
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

        return view('backend.investment.list_investment', $data, compact('userInvestments'));
    }

    public function ViewInvestment($investmentId) {
        $id = Auth::user()->id;
        $viewData = User::find($id);
        $userInvestment = DB::table('investment')
            ->select(
                'investment.id as invId',
                'investment.Nome as invName',
                'investment.Montante as invAmount',
                'investment.HoraOrdem as invStartTime',
                'investment.DataOrdem as invStartDate',
                'investment.HoraFecho as invEndTime',
                'investment.DataFecho as invEndDate',
                'investment.MontanteFinal as endAmount',
                'category.name as catName'
            )
            ->join(
                'category', 
                'category.id', '=', 'investment.category_id')
            ->where(
                'investment.id', $investmentId)
            ->get();
       
        return view('backend.investment.investment_details', compact('userInvestment'));
    }

    public function GetDataGraphInvest() {
        $id = Auth::user()->id;
        $dados = DB::table('category')
            ->select(
                DB::raw('SUM(investment.Montante) as totalInicial'),
                DB::raw('SUM(investment.MontanteFinal) as totalFinal'),
                'category.name as catName'
            )
            ->join(
                'investment', 
                'investment.category_id', '=', 'category.id')
            ->where(
                'category.user_id','=', $id)
            ->groupBy('category.name')
            ->get();
        return $dados;
    }

    public function RemoveInvestment($invId) {
        $id = Auth::user()->id;
        try {
            DB::table('investment')->delete($invId);
            $notification = array(
                'message' => "Investimento apagado com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e){
            $notification = array(
                'message' => 'Investimento não foi apagado',
                'alert-type' => 'error'
            );
        }
        return redirect()->route('investment.list', $id)->with($notification);
    }

    public function CloseInvestment($invId) {
        $investment = DB::table('investment')
        ->select(
            'id',
            'Nome',
            'Montante',
            'HoraOrdem',
            'DataOrdem',
            'HoraFecho',
            'DataFecho',
            'MontanteFinal',
        )
        ->where('id',$invId)->get()[0];
        return view('backend.investment.close_investment', compact('investment'));
    }

    public function CloseInvestmentSubmit(Request $req, $invId) {
        $newEndDate = $req->endDate;
        $newEndTime = $req->endTime;
        $id = Auth::user()->id;
        
        $alertMessage = "Alertas:";
        $prevValues = DB::table('investment')
            ->select(
                'HoraOrdem',
                'DataOrdem',
                'DataFecho',
                'HoraFecho'
            )
            ->where('id', $invId)
            ->get()[0];

        if ($req->closeAmount == null) {
            $notification = array(
                'message' => 'Tem de introduzir um Valor de Fecho',
                'alert-type' => 'error'
            );
            return redirect()->route('investment.list', $id)->with($notification);
        }
        
        $updateInvestment = DB::table('investment')
            ->where('id', $invId);
        $updateInvestment->update(['MontanteFinal' => $req->closeAmount]);

        if($newEndDate != $prevValues->DataFecho) {
            if (Date($prevValues->DataOrdem) <= Date($newEndDate) || Date($prevValues->DataOrdem) == Date($newEndDate) && Date($prevValues->HoraOrdem) > Date($newEndTime)) {
                $updateInvestment->update(['DataFecho' => $newEndDate]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Data de Fecho não foi alterada!";
            }
        }

        if($newEndTime != $prevValues->HoraFecho) {
            if((Date($prevValues->DataOrdem) == Date($newEndDate) && Date($prevValues->HoraOrdem) < Date($newEndTime)) || Date($prevValues->DataOrdem) < Date($newEndDate)) {
                $updateInvestment->update(['HoraFecho' => $newEndTime]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Hora de Ordem não foi alterada!";
            }
        }
        if (strcmp($alertMessage, "Alertas:") !== 0) {
            $notification = array(
                'message' => $alertMessage,
                'alert-type' => 'error'
            );
            
        } else {
            $notification = array(
                'message' => "O investimento foi fechado com Sucesso!",
                'alert-type' => 'success'
            );
        }

        return redirect()->route('investment.list', $id)->with($notification);
    }

    public function GetDataGraphInvestIniTerm() {
        $id = Auth::user()->id;
        $resultado = DB::table('investment')
            ->select(
                'investment.Montante as Inicial',
                'investment.MontanteFinal as Final',
                'investment.Nome as Nome'
            )
            ->join(
                'category', 
                'category.id', '=', 'investment.category_id')
            ->where(
                'category.user_id','=', $id)
            ->get();
        return $resultado;
    }
}
