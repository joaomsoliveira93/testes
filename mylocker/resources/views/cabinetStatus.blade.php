@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Estado do Armários</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Estado dos Armários</a>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>
<a href="" class="btn btn-success btn-rounded floatButton" data-toggle="modal" data-target="#addCabinet"> <span
        class="fa fa-plus"></span> Novo Armário</a>
<div class="wrapper wrapper-content animated fadeInRight">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                @if (!empty($cabinets[0]))
                @foreach ($cabinets as $cabinet)

                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-title">
                            <h5> {{ $cabinet->local }} </h5>
                            {{$cabinets->links('layouts.paginationlinks')}}
                            <a id="dropCabinet" href="{{ route('dropcabinet', $cabinet->id) }}"
                                class="btn btn-outline btn-danger m-xs">Eliminar Armário <i class="fa fa-times"></i>
                            </a>
                        </div>
                        <div class="ibox-content">
                            <div class="row">
                                @if (!empty($lockers[0]))
                                    @foreach ($lockers as $locker)
                                        @if ($locker->cabinet_id == $cabinet->id)
                                            <div class="col-lg-3">
                                            @if ($locker->isFree == 1)
                                                <div class="panel panel-primary">
                                            @elseif($locker->isFree == 2)
                                                <div class="panel panel-warning">
                                            @else
                                                <div class="panel panel-danger">
                                            @endif
                                            <div class="panel-heading">
                                                Cacifo {{$locker->position}}
                                            </div>
                                            <div class="panel-body">
                                                @php
                                                $bool = false;
                                                @endphp
                                                @foreach ($projects as $project)
                                                    @if ($project->locker_id == $locker->id)
                                                        @php
                                                        $bool = true;
                                                        @endphp
                                                        <strong>Projeto:</strong>
                                                        {{ $project->project_name }};
                                                        <br>
                                                        <strong> Grupo: </strong>
                                                        @foreach ($members as $member)
                                                            @if ($member->group_id == $project->group_id and $project->locker_id == $locker->id)
                                                                {{ $member->name }};
                                                            @endif
                                                        @endforeach
                                                    @endif
                                                @endforeach
                                                @if ($bool == false)
                                                    <p>Cacifo livre</p>
                                                @endif
                                                @if ($locker->isFree == 0 OR $locker->isFree == 2)
                                                    <p>
                                                        <a href="{{ route('lockerdetails', $locker->id) }}"class="btn btn-xs btn-outline btn-primary">Detalhes<i class="fa fa-long-arrow-right"></i> </a>                                                            
                                                    </p>
                                                    
                                                @endif
                                                @if($locker->isFree == 2)
                                                    <span class="label label-warning"> Este cacifo será aberto a {{$locker->releaseDate}} </span>
                                                    @endif
                                            </div>
                                                    
                                            </div>
                                        </div>
                                        @endif
                                    @endforeach
                                @else
                                    <strong>Este Armário não possui Cacifos</strong>
                                @endif
                                    </div>

                                </div>
                            </div>
                        </div>
                        @endforeach

                        @endif
                    </div>
                </div>
            </div>


            <div class="modal inmodal" id="addCabinet" tabindex="-1" role="dialog" style="display: none;"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content animated bounceInRight">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <i class="fa fa-columns modal-icon"></i>
                            <h4 class="modal-title">Novo Armário</h4>
                        </div>

                        <form method="POST" action="{{ route('addcabinet')}}">
                            @csrf
                            <div class="modal-body">

                                <div class="lg-sm-2">
                                    <div class="form-group">
                                        <label class="col-form-label" for="local">Nome do Local</label>
                                        <input type="text" id="local" name="local" value="" placeholder="Nome do Local"
                                            class="form-control" required>
                                    </div>
                                </div>
                                <div class="lg-sm-3">
                                    <div class="form-group">
                                        <label class="col-form-label" for="lockers">Quantidade de Cacifos</label>
                                        <input type="number" id="lockers" name="lockers" value=""
                                            placeholder="Quantidade de cacifos" class="form-control" required>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                <button type="submit" class="btn btn-primary">Criar armário</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

        @endsection