@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading" >
    <div class="col-lg-10">
        <h2>Requisições de cacifo</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item active">
                <a>Requisições de cacifo</a>
            </li>
        </ol>
    </div>
</div>

<div class="wrapper wrapper-content  animated fadeInRight">
    <div class="row">
        <div class="col-lg-4">
            <div class="ibox">
                <div class="ibox-content">
                    <h3>Aguardam atribuição do gestor</h3>
                    <ul class="sortable-list connectList agile-list"   id="todo">
                        @if(count($reqManager)>0)
                        @foreach($reqManager as $req)
                        
                            <li class="danger-element ui-sortable-handle" id="task1">
                                Grupo {{ $req->group_id }} - Projeto: {{$req->name}}
                                <div class="agile-detail">
                                <a href="{{route('requestdetails',$req->id)}}" class="float-right btn btn-xs btn-white">Abrir Pedido</a>
                                    <i class="fa fa-clock-o"></i> Data de Requisição:{{$req->created_at}} <br> <i class="fa fa-clock-o"></i> Data de Actualização:{{$req->updated_at}}
                                </div>
                            </li>
                        @endforeach
                        
                        @else
                        <li class="danger-element ui-sortable-handle" >
                            Não existem Requisições de cacifo pendentes!
                        </li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="ibox">
                <div class="ibox-content">
                    <h3>Aguardam aprovação do docente</h3>
                    
                    <ul class="sortable-list connectList agile-list ui-sortable"   id="inprogress">
                        
                        @if(count($reqTeacher)>0)
                            @foreach($reqTeacher as $req)
                                <li class="warning-element ui-sortable-handle" id="task9">
                                    Grupo {{ $req->group_id }} - Projeto: {{$req->name}}
                                    <div class="agile-detail">
                                    <a href="{{route('requestdetails',$req->id)}}" class="float-right btn btn-xs btn-white">Abrir Pedido</a>
                                        <i class="fa fa-clock-o"></i> Data de Requisição:{{$req->created_at}} <br> <i class="fa fa-clock-o"></i> Data de Actualização:{{$req->updated_at}}
                                    </div>
                                </li>
                            @endforeach
                        @else
                        <li class="warning-element ui-sortable-handle" >
                            Não existem Requisições de cacifo pendentes!
                        </li>
                        @endif
                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="ibox">
                <div class="ibox-content">
                    <h3>Aprovados</h3>
                    <ul class="sortable-list connectList agile-list ui-sortable"   id="completed">
                        @if(count($reqCompleted)>0)
                            @foreach($reqCompleted as $req)
                                <li class="success-element ui-sortable-handle" id="task1">
                                    Grupo {{ $req->group_id }} - Projeto: {{$req->name}}
                                    <div class="agile-detail">
                                    <a href="{{route('requestdetails',$req->id)}}" class="float-right btn btn-xs btn-white">Abrir Pedido</a>
                                        <i class="fa fa-clock-o"></i> Data de Requisição:{{$req->created_at}} <br> <i class="fa fa-clock-o"></i> Data de Actualização:{{$req->updated_at}}
                                    </div>
                                </li>
                            @endforeach
                        
                        @else
                        <li class="success-element ui-sortable-handle" >
                            Não existem Requisições de cacifo aprovadas!
                        </li>
                        @endif
                        
                    </ul>
                </div>
            </div>
        </div>

    </div>

</div>


@endsection