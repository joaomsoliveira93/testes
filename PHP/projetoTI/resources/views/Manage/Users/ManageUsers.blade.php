@extends('layouts.app')
@section('content')

<div id="top-bar" class="background-container justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-users"></span> Gerir Utilizadores</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">

        <li class="breadcrumb-item">
            <a>Gerir Utilizadores</a>
        </li>
    </ol>

</div>
@php
if(!isset($name)){
$name="";
}

if(!isset($email)){
$email="";
}

if(!isset($type)){
$type=3;
}

if(!isset($active)){
$active=3;
}
@endphp
<form method="GET" action="{{route('accounts.search')}}">
    @csrf
    <div class="background-container row justify-content-start filters">
        <div>
            <h5>Filtros</h5>
        </div>
        <div class="col-12  col-lg-2 ">
            Nome
            <input type="text" name="name" id="name" value="{{$name}}" placeholder="Nome do utilizador">
        </div>
        <div class="col-12  col-lg-2 ">
            E-mail
            <input type="text" name="email" id="email" value="{{$email}}" placeholder="E-mail">
        </div>
        <div class="col-12  col-lg-2">
            Tipo
            <select name="type" id="type">
                <option @if($type==3) selected @endif value="3">Todos</option>
                <option @if($type==2) selected @endif value="2">Administrador</option>
                <option @if($type==1) selected @endif value="1">Gestor</option>
                <option @if($type==0) selected @endif value="0">Utilizador</option>

            </select>
        </div>
        <div class="col-12  col-lg-2">
            Estado
            <select name="active" id="active">
                <option @if($active==3) selected @endif value="3">Todos</option>
                <option @if($active==1) selected @endif value="1">Ativada</option>
                <option @if($active==0) selected @endif value="0">Desativada</option>

            </select>
        </div>
        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>
    </div>
</form>

<div class="content background-container">

    <div class="row">
        @if(count($users)==0)
        <h2>Sem utilizadores para apresentar</h2>
        @endif
        @foreach ($users as $user)
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
            <div class="card">
                <div class="card__header">
                    <h1>{{$user->name}}</h1>
                </div>
                <div class="card__body">
                    <p>E-mail: {{$user->email}}</p>
                    <p>Tipo de Conta:
                        @if($user->type == 0)
                        Utilizador
                        @elseif($user->type == 1)
                        Gestor
                        @else
                        Administrador
                        @endif
                    </p>
                    <p>Estado:
                        @if($user->active == 1)
                        <span class="bg-success">Ativada</span>
                        @else
                        <span class="bg-danger">Desativada</span>
                        @endif
                    </p>
                    <p>Conta Facebook:
                        @if($user->fbaccounts==null)
                        Não Ativa
                        @else
                        Ativa
                        @endif
                    </p>
                    <p> Conta Linkedin:
                        @if($user->linaccounts==null)
                        Não Ativa
                        @else
                        Ativa
                        @endif
                    </p>
                </div>
                <div class="card__footer">
                    <a class="btn btn-outline-info" href="{{route('user.view',$user->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endforeach
    </div>

</div>
<div class="float-button background-container" data-bs-toggle="modal" data-bs-target="#addAccount"> <span class="fa fa-plus"></span> </div>
<div class="modal fade" id="addAccount" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-user"></span> Adicionar conta</h4>
            </div>

            <form method="POST" action="{{route('account.add')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="" class="form-control" placeholder="id" hidden>
                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="" class="form-control" placeholder="Nome">
                    </div>

                    <div class="form-group">
                        <label>E-mail</label>
                        <input name="email" type="text" value="" class="form-control" placeholder="E-mail">
                    </div>
                    <div class="form-group">
                        <label>Tipo de Conta:</label>
                        <select name="type" id="type" class="form-control">
                            <option value="0" selected>Utilizador</option>
                            <option value="1">Gestor</option>
                            <option value="2">Administrador</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Estado da Conta:</label>
                        <select name="active" id="active" class="form-control">
                            <option value="0">Desativada</option>
                            <option value="1" selected>Ativada</option>
                        </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-outline-primary">Guardar Alterações</button>
                </div>

            </form>

        </div>
    </div>
</div>
@endsection