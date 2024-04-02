@extends('layouts.admin_master')
@section('admin')
@php
Session::put('var','release');
@endphp
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Libertar cacifos</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Libertar cacifos</a>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        @if (!empty($cabinets[0]))
        @foreach ($cabinets as $cabinet)

        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>{{ $cabinet->local }} </h5>

                    <a id="releaseAllLockers" href="{{ route('releasealllockers', $cabinet->id) }}"
                        class="btn btn-xs  btn-danger" style="right:20px;position:fixed">Libertar todos os cacifos <i
                            class="fa fa-unlock"></i> </a>
                    {{$cabinets->links('layouts.paginationlinks')}}
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
                                            Cacifo {{ $locker->position }}
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
                                            <strong>Grupo:</strong>
                                            @foreach ($members as $member)
                                            @if ($member->group_id == $project->group_id and $project->locker_id ==
                                            $locker->id)
                                            {{ $member->name }};
                                            @endif
                                            @endforeach
                                            @endif
                                            @endforeach
                                            @if ($bool == false)
                                            <p>Este cacifo não tem grupo associado</p>
                                            @endif
                                            <br>
                                            @if ($locker->isFree == 0)
                                            <a id="release" href="{{ route('releaselocker', $locker->id) }}"
                                                class="btn btn-xs btn-outline btn-danger">@csrf Libertar cacifo <i
                                                    class="fa fa-unlock"></i> </a>
                                            @elseif($locker->isFree == 2)
                                            
                                            <span class="label label-warning"> Este cacifo será aberto a {{$locker->releaseDate}}</span>
                                            @endif

                                        </div>
                                    </div>
                                </div>
                                @endif
                                @endforeach
                                @else
                                <strong>Este armário não tem cacifos</strong>
                                @endif
                            </div>

                        </div>
                    </div>
                </div>
                @endforeach
                @endif
            </div>

            @endsection