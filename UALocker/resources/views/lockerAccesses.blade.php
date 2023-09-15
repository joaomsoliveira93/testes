@extends('layouts.admin_master')
@section('admin')
@php
$prefix = Request::route()->getPrefix();
$route = Route::current()->getName();
@endphp


<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Informação de acesso aos cacifos</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Acessos aos cacifos</a>

            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight">

    <div class="ibox-content m-b-sm border-bottom ">
        <form type="get" action="{{url('/accesses/search')}}">
            <div class=" row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="col-form-label" for="op">Operação</label>
                        <select name="op" id="op" class="form-control">
                            <option value="" 
                            @if($op == '')
                                selected="selected"
                            @endif
                            >Todas</option>
                            <option value="1"
                            @if($op == '1')
                                selected="selected"
                            @endif
                            >Abertura</option>
                            <option value="0"
                            @if($op == '0')
                                selected="selected"
                            @endif
                            >Fecho</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="col-form-label" for="name">Nome</label>
                        <input type="text" id="name" name="name" value="{{$name}}" placeholder="Nome" class="form-control">
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="form-group">
                            <label class="col-form-label" for="cab">Armário</label>
                            <select name="cab" id="cab" class="form-control">
                                <option value="" 
                                @if(count($cabinets)==0)
                                    selected="selected"
                                @endif
                                >Todos</option>
                                @foreach($cabinets as $cabinet)
                                    <option value="{{$cabinet->id}}"
                                    @if($cab == $cabinet->id)
                                        selected="selected"
                                    @endif
                                    >{{$cabinet->local}}</option>
                                @endforeach
                            </select>
                        </div>
                </div>

                <div class="col-sm-1">
                    <div class="form-group">
                            <label class="col-form-label" for="op">Cacifo</label>
                            <input type="number" id="locker" name="locker" value="{{$locker}}" placeholder="Cacifo" class="form-control">
                        </div>
                </div>

                <div class="col-sm-1">
                    <button type="submit"  value="Procurar" class="btn btn-primary" style="height:35px;margin-top:34px;"> <a class="fa fa-search"></a> </button>
                </div>

                
            </div>
        </form>


        <div class="row">
            <div class="col-lg-12">
                <div class="ibox-content">
                    @foreach ($acc_info as $access)
                    <div class="stream-small">
                        @if ($access->operation == 1)
                        <span class="label label-primary">Abertura</span>
                        <span class="text-muted"> {{ $access->maded_at }}</span> / <a href="{{route('viewaccount', $access->student_id)}}" style="color:blueviolet">{{ $access->user_name }}</a> Abriu o cacifo {{ $access->position }} - {{$access->local}}
                        @else
                        <span class="label label-danger">Fecho</span>
                        <span class="text-muted"> {{ $access->maded_at }}</span> / <a href="{{route('viewaccount', $access->student_id)}}" style="color:blueviolet">{{ $access->user_name }}</a> Fechou o cacifo {{ $access->position }} - {{$access->local}}
                        @endif
                    </div>
                    @endforeach
                </div>
                {{$acc_info->links('layouts.paginationlinks')}}
            </div>
        </div>
    </div>

</div>




@endsection