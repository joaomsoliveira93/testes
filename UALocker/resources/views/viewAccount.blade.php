@extends('layouts.admin_master')
@section('admin')

@php
$user = Session::get('user');
@endphp

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Detalhes da conta</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{route('manageaccounts')}}">Gerir contas</a>

            </li>
            <li class="breadcrumb-item active">

                <a>{{ $account->id }} - {{ $account->name }}</a>
            </li>
        </ol>
    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5> {{ $account->name }}</h5>
                </div>
                <div class="ibox-content">
                    
                    <div class="form-group row ">
                        <a id="editAccountOpen" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#editAccount">Editar <i class="fa fa-edit"></i> </a>
                        <a id="dropAccount" href="{{route('dropaccount',$account->id)}}" class="btn btn-outline btn-danger m-xs">Apagar <i class="fa fa-times"></i> </a>
                        <a id="resetPassword" href="{{route('resetpassword',$account->id)}}" class="btn btn-outline btn-info m-xs">Restaurar palavra-passe<i class=" fa fa-key"></i> </a>
                        <a id="resetPin" href="{{route('resetpin',$account->id)}}" class="btn btn-outline btn-info m-xs">Restaurar Pin <i class=" fa fa-key"></i> </a>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nº mecanográfico</label>
                        <div class="col-sm-10">
                            <p>{{ $account->id }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-10">
                            <p>{{ $account->name }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                            <p>{{ $account->email }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="status">Tipo de utilizador</label>
                        <div class="col-sm-10">
                            @if ($account->type == 'manager')
                            <p>Gestor</p>
                            @else
                            <p>Aluno</p>
                            @endif
                        </div>

                    </div>

                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="status">Estado</label>
                        <div class="col-sm-10">
                            @if ($account->isActive == '1')
                            <p>Activo</p>
                            @else
                            <p>Inactivo</p>
                            @endif
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>

    <div class="modal inmodal" id="editAccount" tabindex="-1" role="dialog" style="display: none;z-index:-50" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span id="editAccountClose" class="sr-only">Close</span></button>
                    <i class="fa fa-user modal-icon"></i>
                    <h4 class="modal-title">Editar conta</h4>
                </div>

                <form method="POST" action="{{route('editaccount', $account->id)}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="nmec">Nº mecanográfico</label>
                                <p id="nmec" name="nmec">{{ $account->id }}</p>
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Nome</label>
                                <input type="text" id="name" name="name" value="{{ $account->name }}" placeholder="Nome" class="form-control" >
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="email">E-mail</label>
                                <input type="text" id="email" name="email" value="{{ $account->email }}" placeholder="E-mail" class="form-control" >
                            </div>
                        </div>
                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="type">Tipo de conta </label>
                                <select name="type" id="type" class="form-control" required>
                                    @if( $account->type == "student")
                                    <option value="student" selected="">Aluno</option>
                                    @else
                                    <option value="student">Aluno</option>
                                    @endif

                                    @if($account->type == "manager")
                                    <option value="manager" selected="">Gestor</option>
                                    @else
                                    <option value="manager">Gestor</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="status">Estado</label>
                                <select name="status" id="status" class="form-control" required>
                                    @if( $account->isActive == "1")
                                    <option value="1" selected="">Ativo</option>
                                    @else
                                    <option value="1">Ativo</option>
                                    @endif

                                    @if( $account->isActive == "0")
                                    <option value="0" selected="">Inativo</option>
                                    @else
                                    <option value="0">Inativo</option>
                                    @endif

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button id="saveAccount" type="submit" class="btn btn-primary">Guardar Alterações</button>
                    </div>

                </form>

            </div>
        </div>
    </div>

</div>


@endsection