@extends('layouts.admin_master')
@section('admin')
@php
$prefix = Request::route()->getPrefix();
$route = Route::current()->getName();
Session::put('var','details');
@endphp


<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Detalhes do cacifo</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                @if ($prefix == 'cabinetstatus')
                <a href=" {{ route('cabinetstatus') }}">Estado dos Armários</a>
                @else
                <a href=" {{ route('mylockers.view') }}">Os meus cacifos</a>
                @endif

            </li>
            <li class="breadcrumb-item">
                <a>Detalhes do Cacifo</a>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight">

    <div class="row">
        <div class="col-lg-6">
            <div class="ibox product-detail">
                <div class="ibox-content">
                    <div class="row">
                        <div>
                            <h2 class="font-bold m-b-xs">
                                Detalhes do cacifo {{$loc->position}} - {{$loc->local}}
                            </h2>

                            <hr>

                            <h4>Projeto: {{ $loc->project_name }}</h4>



                            <div class="small text-muted" style="display:inline-block">
                                <h4>Responsáveis associados:</h4>
                                @foreach($tea as $teacher)
                                <h5>{{ $teacher->name }} -> {{ $teacher->email }} </h5>
                                @endforeach

                            </div>

                            <div class="small m-t-md">
                                <h4>Membros do grupo:</h4>
                                <ul>
                                    @foreach ($mem as $member)

                                    @if ($member->group_id == $loc->group_id)
                                    <li>

                                        <h5>{{ $member->name }} -> {{ $member->email }}
                                            @if (Auth::user()->userType == 'manager' && $loc->isFree!=2)
                                            <a class="dropGroupMember btn btn-outline btn-danger s-xs" href="{{route('dropgroupmember',['groupid'=>$member->group_id,'memberid'=>$member->id,'id'=>$loc->id])}}"><i class="fa fa-times"></i> </a>
                                            @endif
                                        </h5>
                                    </li>
                                    @endif
                                    @endforeach
                                </ul>

                            </div>
                            <hr>

                            @if (Auth::user()->userType == 'manager')
                            <div>
                                <div class="btn-group">
                                    @if($loc->isFree == 2)
                                    <span class="label label-warning"> <h4>Este cacifo será aberto a {{$loc->releaseDate}}</h4> </span>
                                    @else
                                    <a id="release" class="btn btn-danger btn-sm" href="{{ route('releaselocker', $loc->id) }}"><i class="fa fa-unlock"></i>&nbsp; Libertar Cacifo</a>
                                    <button class="btn btn-white btn-sm" data-toggle="modal" data-target="#addGroupMember"><i class="fa fa-plus"></i> Adicionar aluno </button>
                                    @endif
                                </div>
                            </div>
                            @else
                            <div>
                                <div class="btn-group">
                                    @if($loc->isFree == 2)
                                    <span class="label label-warning">Este cacifo será aberto a {{$loc->releaseDate}}</span>
                                    @endif


                                </div>
                            </div>
                            @endif
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="col-lg-6">
            <div class="ibox ">
                <div class="ibox-title">
                    <h2 class="font-bold m-b-xs">Informação de acesso ao cacifo</h2>
                </div>

                <div class="ibox-content">
                    @php $i=0 @endphp
                    @foreach ($acc_info as $access)
                    @if($access->locker_id == $loc->id)
                    @php $i++ @endphp
                    <div class="stream-small">
                        @if ($access->operation == 1)
                        <span class="label label-primary">Abertura</span>
                        <span class="text-muted"> {{ $access->maded_at }}</span> / <a style="cursor:auto">{{ $access->user_name }} - {{ $access->user_id }}</a> Abriu o cacifo
                        @else
                        <span class="label label-danger">Fecho</span>
                        <span class="text-muted"> {{ $access->maded_at }}</span> / <a style="cursor:auto">{{ $access->user_name }}</a> Fechou o cacifo
                        @endif
                    </div>
                    @endif
                    @endforeach
                    @if($i==0)
                    <a>Não Existem acessos</a>
                    @endif
                    {{$acc_info->links('layouts.paginationlinks')}}
                </div>

            </div>
        </div>
    </div>

    <div class="modal inmodal" id="addGroupMember" tabindex="-1" role="dialog" style="display: none;z-index:-50" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span id="addTeacherClose" class="sr-only">Close</span></button>
                    <i class="fa fa-user modal-icon"></i>
                    <h4 class="modal-title">Adicionar Membro </h4>
                </div>

                <form method="POST" action="{{route('addgroupmember',['groupid'=>$loc->group_id,'id'=>$loc->id])}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="student">Alunos Disponíveis</label>
                                <select name="student" id="student" class="form-control" required>
                                    @foreach ($allStudents as $student)
                                    <option value="{{$student->id}}">{{$student->id}} - {{$student->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button id="addStudent" type="submit" class="btn btn-primary">Adicionar</button>
                    </div>

                </form>

            </div>
        </div>
    </div>

</div>

@endsection