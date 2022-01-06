@extends('layouts.master')

@section('content')
<div>
    <form method="POST" action="{{route('cliente.edit.submit',$cliente->id)}}">
    @csrf
                <h2>Editar Cliente</h2>
           
                Nome:
                <input class="f-input" type="text" id="nome" name="nome" value="{{$cliente->nome}}"> <br>
            
                <td>Email:</td>
                <input class="f-input" type="text" id="email" name="email" value="{{$cliente->email}}"> <br>
           
                <td>Telefone:</td>
                <input class="f-input" type="text" id="telefone" name="telefone" value="{{$cliente->telefone}}"> <br>
           
                <td>WebSite:</td>
                <input class="f-input" type="text" id="website" name="website" value="{{$cliente->website}}"> <br>
           
                <td>Morada:</td>
                <input class="f-input" type="text" id="morada" name="morada" value="{{$cliente->morada}}"> <br>
                <input type="submit" class="btn" value="Guardar">
                 <a  class="btn btn-danger" >Cancelar</a>



    </form>



</div>

@endsection