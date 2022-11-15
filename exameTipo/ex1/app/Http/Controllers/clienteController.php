<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cliente;

class clienteController extends Controller
{
    public function getAll(){
        $clientes = cliente::all();
        return view('clientes',compact('clientes'));
    }

    public function getcliente($id){
        $cliente = cliente::findOrFail($id);
        return view('verCliente', compact('cliente'));
    }

    public function editCliente($id){
        $cliente = cliente::findOrFail($id);
        return view('editarCliente', compact('cliente'));
    }

    public function addCliente(){
        return view('addCliente');
    }

    public function editClienteSubmit(Request $request,$id){
        $cliente = cliente::findOrFail($id);
        $cliente->nome = $request->nome;
        $cliente->email = $request->email;
        $cliente->telefone = $request->telefone;
        $cliente->website = $request->website;
        $cliente->morada = $request->morada;
        $cliente->save();

        return view('verCliente', compact('cliente'));
    }

  

    public function addClienteSubmit(Request $request){
        $cliente = new Cliente;
        $cliente->nome = $request->nome;
        $cliente->email = $request->email;
        $cliente->telefone = $request->telefone;
        $cliente->website = $request->website;
        $cliente->morada = $request->morada;
        $cliente->save();

        return view('verCliente', compact('cliente'));
    }

    public function dropClienteSubmit($id){
        $cliente = cliente::findOrFail($id);
       
        $cliente->delete();

        return redirect('/');
    }
}
