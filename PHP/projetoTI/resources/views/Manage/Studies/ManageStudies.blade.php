@extends('layouts.app')
@section('content')

<div id="top-bar" class="background-container justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-edit"></span> <span class="fa fa-book"></span> Gerir Estudos</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a>Gerir Estudos</a>
        </li>
    </ol>

</div>
@php
if(!isset($name)){
$name="";
}

@endphp
<form method="GET" action="{{route('studies.manage.search')}}">
    @csrf
    <div class="background-container row justify-content-start filters">
        <div>
            <h5>Filtros</h5>
        </div>
        <div class="col-12  col-lg-2 ">
            Nome:
            <input type="text" name="name" id="name" value="{{$name}}" placeholder="Nome">
        </div>
        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>
    </div>
</form>



<div class="content background-container" style="top:275px!important">
    <div class="row">
        @if(count($studies)==0)
        <h2>Sem Estudos para apresentar</h2>
        @endif
        @foreach ($studies as $study)
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
            <div class="card">
                <div class="card__header">
                    <h1>{{$study->name}}</h1>
                </div>
                <div class="card__body">
                    <p> {{$study->obs}}</p>

                </div>
                <div class="card__footer">
                    <h5>Data de Inicio: {{$study->created_at}} </h5>
                    <h5>Data de Fim: {{$study->finish_at}} </h5>
                    <a class="btn btn-outline-info" href="{{route('study.manage',$study->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>


                </div>
            </div>
        </div>
        @endforeach


    </div>
</div>
<div class="float-button background-container" data-bs-toggle="modal" data-bs-target="#addStudy"> <span class="fa fa-plus"></span> </div>
<div class="modal fade" id="addStudy" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-book"></span> Criar novo estudo</h4>
            </div>

            <form method="POST" action="{{route('study.add')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="" class="form-control" placeholder="Nome" hidden>
                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="" class="form-control" placeholder="Nome">
                    </div>

                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea name="obs" type="text" value="" class="form-control" placeholder="Descrição"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Data de inicio:</label>
                        <input name="start" type="date" value="" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
                    </div>
                    <div class="form-group">
                        <label>Data de fim:</label>
                        <input name="end" type="date" value="" class="form-control">
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