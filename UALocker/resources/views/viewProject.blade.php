@extends('layouts.admin_master')
@section('admin')

@php
$user = Session::get('user');
@endphp

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Detalhes do Projeto</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{route('manageprojects')}}">Gerir Projetos</a>

            </li>
            <li class="breadcrumb-item active">

                <a>{{ $project->id }} - {{ $project->name }}</a>
            </li>
        </ol>
    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce">

    <div class="row">
        <div class="col-lg-6">
            <div class="ibox">
                <div class="ibox-title">
                <h2 class="font-bold m-b-xs"> {{ $project->name }} </h2>
                </div>
                <div class="ibox-content">
                    
                    <div class="form-group row ">
                        <a id="editProjectOpen" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#editProject">Editar <i class="fa fa-edit"></i> </a>
                        <a id="dropProject" href="{{route('dropproject',$project->id)}}" class="btn btn-outline btn-danger m-xs">Apagar <i class="fa fa-times"></i> </a>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">ID</label>
                        <div class="col-sm-10">
                            <p>{{ $project->id }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-10">
                            <p>{{ $project->name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="ibox ">
                <div class="ibox-title">
                    <h2 class="font-bold m-b-xs">Docentes associados</h2>
                </div>

                <div class="ibox-content" >
                    <a id="addTeacherOpen" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#addTeacher">Adicionar Docente  <i class="fa fa-plus"> </i></a>
                    @foreach ($teachers as $teacher)
                            <div class="stream-small">
                                <span class="text-muted"> {{ $teacher->id }}</span> - <a style="cursor:auto">{{ $teacher->name }}</a>  - <a style="cursor:auto">{{ $teacher->email }}</a> <a  class="dropProjectTeacher btn btn-outline btn-danger s-xs" href="{{route('dropprojectteacher',['id'=>$project->id,'teacherid'=>$teacher->id])}}"><i class="fa fa-times"></i> </a>                         
                            </div>
                     
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <div class="modal inmodal" id="editProject" tabindex="-1" role="dialog" style="display: none;z-index:-50" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span id="editProjectClose" class="sr-only">Close</span></button>
                    <i class="fa fa-folder-open modal-icon"></i>
                    <h4 class="modal-title">Editar Projeto</h4>
                </div>

                <form method="POST" action="{{route('editproject', $project->id)}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="nmec">ID</label>
                                <p id="nmec" name="nmec">{{ $project->id }}</p>
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Nome</label>
                                <input type="text" id="name" name="name" value="{{ $project->name }}" placeholder="Nome" class="form-control" >
                            </div>
                        </div>
                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button id="saveProject" type="submit" class="btn btn-primary">Guardar Alterações</button>
                    </div>

                </form>

            </div>
        </div>
    </div>

    <div class="modal inmodal" id="addTeacher" tabindex="-1" role="dialog" style="display: none;z-index:-50" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span id="addTeacherClose" class="sr-only">Close</span></button>
                    <i class="fa fa-address-card modal-icon"></i>
                    <h4 class="modal-title">Adicionar Docente</h4>
                </div>

                <form method="POST" action="{{route('addprojectteacher',$project->id)}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="Docentes">Docentes Disponíveis</label>
                                <select name="docente" id="docente" class="form-control" required>     
                                @foreach ($allTeachers as $teacher)                               
                                    <option value="{{$teacher->id}}" >{{$teacher->id}} - {{$teacher->name}}</option>    
                                @endforeach
                                </select>
                            </div>
                        </div>
                      
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button id="saveProject" type="submit" class="btn btn-primary">Adicionar</button>
                    </div>

                </form>

            </div>
        </div>
    </div>

</div>


@endsection