@extends('layouts.master')

@section('content')
<div>
    <form method="POST" action="{{route('cliente.add.submit')}}">
    @csrf
                <h2>Adicionar Clientes</h2>
           
                Nome:
                <input class="f-input" type="text" id="nome" name="nome" value=""> <br>
            
                <td>Email:</td>
                <input class="f-input" type="text" id="email" name="email" value=""> <br>
           
                <td>Telefone:</td>
                <input class="f-input" type="text" id="telefone" name="telefone" value=""> <br>
           
                <td>WebSite:</td>
                <input class="f-input" type="text" id="website" name="website" value=""> <br>
           
                <td>Morada:</td>
                <input class="f-input" type="text" id="morada" name="morada" value=""> <br>
                <input type="submit" class="btn" value="Guardar">
                <a   class="btn btn-danger" >Cancelar</a>



    </form>



</div>

@endsection