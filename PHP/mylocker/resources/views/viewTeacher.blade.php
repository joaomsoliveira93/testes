@extends('layouts.admin_master')
@section('admin')

@php
$user = Session::get('user');
@endphp

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Detalhes do Responsável</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a  href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{route('managemanagers')}}">Gerir Responsáveis </a>

            </li>
            <li class="breadcrumb-item active">

                <a>{{ $teacher->id }} - {{ $teacher->name }}</a>
            </li>
        </ol>
    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5> {{ $teacher->name }}</h5>
                </div>
                <div class="ibox-content">
                    
                    <div class="form-group row ">
                        <a id="editAccountOpen" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#editAccount">Editar <i class="fa fa-edit"></i> </a>
                        <a id="dropTeacher" href="{{route('dropmanager',$teacher->id)}}" class="btn btn-outline btn-danger m-xs">Apagar <i class="fa fa-times"></i> </a>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <p>{{ $teacher->id }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-10">
                            <p>{{ $teacher->name }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                            <p>{{ $teacher->email }}</p>
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
                    <i class="fa fa-address-card modal-icon"></i>
                    <h4 class="modal-title">Editar Responsável</h4>
                </div>

                <form method="POST" action="{{route('editmanager', $teacher->id)}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="nmec">Id</label>
                                <p id="nmec" name="nmec">{{ $teacher->id }}</p>
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Nome</label>
                                <input type="text" id="name" name="name" value="{{ $teacher->name }}" placeholder="Nome" class="form-control" >
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="email">E-mail</label>
                                <input type="text" id="email" name="email" value="{{ $teacher->email }}" placeholder="E-mail" class="form-control" >
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