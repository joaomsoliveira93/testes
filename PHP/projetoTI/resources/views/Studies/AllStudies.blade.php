@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-book"></span> Estudos</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a>Estudos</a>
        </li>
    </ol>

</div>
@php
if(!isset($name)){
$name="";
}

@endphp
<form method="GET" action="{{route('studies.search')}}">
    @csrf
    <div class="row justify-content-start filters">
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


<div class="content" style="top:275px!important">
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
                    <a class="btn btn-outline-info" href="{{route('study.view',$study->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>

                    @if($study->finish_at > now())
                    @php $a = false @endphp
                    @foreach($activeStudies as $active)
                    @if($active->studies->id == $study->id)
                    @php $a = true @endphp
                    @endif
                    @endforeach

                    @if($a != true)
                    <a href="{{route('study.enter',[$study->id,'all'])}}" class="btn btn-outline-success">Participar <span class="fa fa-edit"></span> </a>

                    @else
                    <a href="{{route('study.exit',[$study->id,'all'])}}" class="btn btn-outline-danger">Sair <span class="fa fa-sign-out"></span></a>
                    @php $a = false @endphp
                    @endif


                    @endif
                </div>
            </div>
        </div>
        @endforeach


    </div>
    @endsection