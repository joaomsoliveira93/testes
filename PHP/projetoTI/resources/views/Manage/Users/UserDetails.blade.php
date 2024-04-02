@extends('layouts.app')
@section('content')

<div id="top-bar" class="background-container justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-user"></span> Detalhes do Utilizador</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">

        <li class="breadcrumb-item">
            <a href="{{route('accounts.view')}}">Gerir Utilizadores</a>
        </li>
        <li class="breadcrumb-item">
            <a>Detalhes do Utilizador</a>
        </li>
    </ol>

</div>

<div class="content background-container" style="top: 200px!important;">

    <h2>{{$user->name}}</h2>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="card">
                <div class="card__header">
                    <h3>Dados Pessoais</h3>
                </div>
                <div class="card__body">
                    E-mail: {{$user->email}}
                    <br>
                    Tipo de conta:
                    @if($user->type==0)
                    Utilizador
                    @elseif($user->type==1)
                    Gestor
                    @else
                    Administrador
                    @endif
                    <br>
                    Estado da conta:
                    @if($user->active==1)
                    Ativada
                    @else
                    Desativada
                    @endif

                </div>
                <div class="card__footer">

                    <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editAccount">Editar Dados da conta <span class="fa fa-edit"></span></a>
                    <a class="btn btn-outline-info" href="{{route('account.password.reset',$user->id)}}">Restaurar Palavra-passe <span class="fa fa-lock"></span></a>
                    <a id="dropAccount" class="btn btn-outline-danger" href="{{ route('account.drop', $user->id) }}">Apagar <span class="fa fa-times"></span></a>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="card">
                <div class="card__header">
                    <h3>Redes Sociais</h3>
                    <span style="font-size:40px " class="fa fa-facebook-official"></span>
                    @if($user->fbaccounts==null)
                    Não Ativada
                    @else
                    Ativada
                    @endif
                    <br>
                    <span style="font-size:40px " class="fa fa-linkedin-square"> </span>
                    @if($user->linaccounts==null)
                    Não Ativada
                    @else
                    Ativada
                    @endif
                    <br>
                </div>
                <div class="card__body">


                </div>
                <div class="card__footer">

                </div>
            </div>

        </div>

    </div>
</div>
<div class="modal fade" id="editAccount" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-user"></span> Editar dados da conta</h4>
            </div>

            <form method="POST" action="{{route('account.edit')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{ $user->id }}" class="form-control" placeholder="Nome" hidden>
                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="{{ $user->name }}" class="form-control" placeholder="Nome">
                    </div>

                    <div class="form-group">
                        <label>E-mail</label>
                        <input name="email" type="text" value="{{ $user->email }}" class="form-control" placeholder="E-mail">
                    </div>
                    <div class="form-group">
                        <label>Tipo de Conta:</label>
                        <select name="type" id="type" class="form-control">
                            <option value="0" @if($user->type==0) selected @endif >Utilizador</option>
                            <option value="1" @if($user->type==1) selected @endif>Gestor</option>
                            <option value="2" @if($user->type==2) selected @endif >Administrador</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Estado da Conta:</label>
                        <select name="active" id="active" class="form-control">
                            <option value="0" @if($user->active==0) selected @endif >Desativada</option>
                            <option value="1" @if($user->active==1) selected @endif >Ativada</option>
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