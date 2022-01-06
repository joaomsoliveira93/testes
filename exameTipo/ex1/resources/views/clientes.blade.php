@extends('layouts.master')
@section('content')
<div>
    <ul>
        @foreach($clientes as $cliente)
            <li>{{$cliente->nome}} -> <a href="{{route('cliente.view',$cliente->id)}}">Ver Detalhes</a> </li>  
                
        @endforeach
    <ul>
        <div id="addClient">
            <a  href="{{route('cliente.add')}}">+</a>            
        </div>
    
</div>

@endsection