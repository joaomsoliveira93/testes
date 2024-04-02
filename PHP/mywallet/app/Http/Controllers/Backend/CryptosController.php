<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class CryptosController extends Controller
{
    public function AddCryptosView() {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $userCryptos = DB::table('cryptos')
        ->select(
            'cryptos.Nome',
        )
        ->get();
        $categorias = DB::table('category')->where('user_id',$id)->get();
        return view('backend.cryptos.add_cryptos', compact('editData', 'userCryptos'), compact('categorias'));
    }

    public function AddCryptosSubmit(Request $req){
        $id = Auth::user()->id;
        //$user = User::find($id);
        DB::table('cryptos')->insert([
            'Nome' => $req->name,
            'Montante' => $req->amount,
            'DataOrdem' => $req->startDate,
            'HoraOrdem' => $req->startTime,
            'DataFecho' => $req->endDate,
            'HoraFecho' => $req->endTime,
            'category_id' => $req->category
        ]);
        $notification = array(
            'message' => 'Criptomoeda inserida com sucesso',
            'alert-type' => 'success'
        );
        return redirect()->route('cryptos.list', $id)->with($notification);
    }

    public function EditCryptosView($cryptosId) {
        $id = Auth::user()->id;
        $editData = User::find($id);
        $userCryptos = DB::table('cryptos')
        ->select(
            'cryptos.id as id',
            'cryptos.Nome as name',
            'cryptos.Montante as amount',
            'cryptos.DataOrdem as startDate',
            'cryptos.HoraOrdem as startTime',
            'cryptos.DataFecho as endDate',
            'cryptos.HoraFecho as endTime',
            'category.id as catId',
            'category.name as catName'
        )
        ->join(
            'category', 
            'category.id', '=', 'cryptos.category_id')
        ->where(
            'cryptos.id', $cryptosId
        )
        ->get();
        
        $userCategories = DB::table('category')
        ->select(
            'id',
            'name'
        )
        ->where(
            'category.user_id', $id)
        ->get();

        return view('backend.cryptos.edit_cryptos_details', compact('userCryptos'), compact('userCategories'));
    }

    public function EditCryptosSubmit(Request $req, $cryptosId) {
        $id = Auth::user()->id;
        // $cryptosId = $req->cryptosId;
        $cryptos = DB::table('cryptos')->select(
            'Nome',
            'Montante',
            'DataOrdem',
            'HoraOrdem',
            'DataFecho',
            'HoraFecho',
            'category_id'
            )
            ->where('cryptos.id', '=', $cryptosId)
            ->get()[0];
            $notification = array(
            'message' => 'Criptomoeda editada com sucesso',
            'alert-type' => 'success'
        );   
        $updateCryptos = DB::table('cryptos')->where('cryptos.id', '=', $cryptosId);

        $newCat = $req->category;
        $newName = $req->name;
        $newAmount = $req->amount;
        $newStartDate = $req->startDate;
        $newStartTime = $req->startTime; //HoraOrdem
        $newEndDate = $req->endDate; //DataFecho
        $newEndTime = $req->endTime; //HoraFecho
        $alertMessage = "Alertas:";


        
        if($newCat != $cryptos->category_id) {
            $cryptos->update(['category_id' => $newCat]);
        }

        if($newName != $cryptos->Nome && $newName != NULL) {
            $updateCryptos->update(['Nome' => $newName]);
        }
        if($newAmount != $cryptos->Montante && $newAmount != NULL) {
            $updateCryptos->update(['Montante' => $newAmount]);
        }
        if($newStartDate != $cryptos->DataOrdem) {
            if (Date($newStartDate) <= Date($newEndDate) || Date($newStartDate) == Date($newEndDate) && Date($newStartTime) > Date($newEndTime)) {
                $updateCryptos->update(['DataOrdem' => $newStartDate]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Data de Ordem não foi alterada!";
                
            }
        }
        if($newStartTime != $cryptos->HoraOrdem) {
            if(Date($newStartDate) == Date($newEndDate) && Date($newStartTime) < Date($newEndTime)) {
                $updateCryptos->update(['HoraOrdem' => $newStartTime]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Hora de Ordem não foi alterada!";
            }
            
        }
        if($newEndDate != $cryptos->DataFecho) {
            if (Date($newStartDate) <= Date($newEndDate) || Date($newStartDate) == Date($newEndDate) && Date($newStartTime) > Date($newEndTime)) {
                $updateCryptos->update(['DataFecho' => $newEndDate]);
            } else {
                if (strcmp($alertMessage, "Alertas:") !== 0) {
                    $alertMessage.=", ";
                }
                $alertMessage.=" Data de Fecho não foi alterada!";
            }
            
        }
        if($newEndTime != $cryptos->HoraFecho) {
            if(Date($newStartDate) == Date($newEndDate) && Date($newStartTime) < Date($newEndTime)) {
                $updateCryptos->update(['HoraFecho' => $newEndTime]);
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
            return redirect()->route('cryptos.list', $id)->with($notification);
        }
        $notification = array(
            'message' => 'Criptomoeda editada com sucesso',
            'alert-type' => 'success'
        );   
        return redirect()->route('cryptos.list', $id)->with($notification);
    }

    public function RemoveCryptos($invId) {
        $id = Auth::user()->id;
        try {
            DB::table('cryptos')->delete($invId);
            $notification = array(
                'message' => "Criptomoeda apagada com sucesso!",
                'alert-type' => 'success'
            );
        } catch (Exception $e){
            $notification = array(
                'message' => 'Criptomoeda não foi apagada',
                'alert-type' => 'error'
            );
        }
        return redirect()->route('cryptos.list', $id)->with($notification);
    }

    public function ListCryptosView($id) {
        $data['allData'] = User::all();
        $userCryptos = DB::table('cryptos')
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

        return view('backend.cryptos.list_cryptos', $data, compact('userCryptos'));
    }
}
