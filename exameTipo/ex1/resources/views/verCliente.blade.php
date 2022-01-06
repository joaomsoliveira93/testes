@extends('layouts.master')
@section('content')

<div>
    <table>
        
        <tr><a class="btn" href="{{route('clientes.all')}}">Voltar</a><h2>Detalhes do Cliente</h2></tr>
        <tr> <a class="btn" href="{{route('cliente.edit',$cliente->id)}}">Editar</a> <a href="{{route('cliente.drop.submit',$cliente->id)}}" class="btn btn-danger">Eliminar</a> </tr>
        <tr><td>Nome:</td> <td>{{$cliente->nome}}</td></tr>
        <tr><td>Email:</td> <td>{{$cliente->email}}</td></tr>
        <tr><td>Telefone:</td> <td>{{$cliente->telefone}}</td></tr>
        <tr><td>WebSite:</td> <td>{{$cliente->website}}</td></tr>
        <tr><td>Morada:</td> <td>{{$cliente->morada}}</td></tr>
        
    </table>
</div>

@endsection