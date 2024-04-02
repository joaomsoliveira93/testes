@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Os meus cacifos</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Os meus cacifos</a>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        @if (!empty($mylockers[0]))
        @foreach ($mylockers as $locker)
        <div class="col-md-3">
            <div class="ibox">
                <div class="ibox-content product-box">
                    <div class="locker-title">
                        <H1>Cacifo {{ $locker->position }} - {{$locker->local}}</H1>
                    </div>
                    <div class="product-desc ">
                        <div class="small m-t-xs">
                            <h4>
                                Membros do grupo:
                            </h4>
                            <h5>
                                @foreach ($members as $member)
                                @if ($member->group_id == $locker->group_id)
                                {{ $member->name }};
                                @endif
                                @endforeach
                            </h5>


                        </div>
                        <h4>Projeto:</h4>
                        <h5> {{ $locker->project_name }} </h5>
                        @if($locker->isFree == 2)
                            <span class="label label-warning">Este cacifo será aberto a {{$locker->releaseDate}}</span>
                        @endif
                        <div class="m-t text-righ">
                            <a href="" class="btn btn-xs btn-outline btn-primary" data-toggle="modal" data-target="#open">Abrir Cacifo</a>
                            <a href="{{ route('mylockerdetails', $locker->id) }}" class="btn btn-xs btn-outline btn-primary">Detalhes <i class="fa fa-long-arrow-right"></i> </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal inmodal" id="open" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content animated bounceInRight">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <i class="fa fa-user modal-icon"></i>
                            <h4 class="modal-title">Cacifo {{ $locker->position }}</h4>
                        </div>

                        <form method="POST" action="{{route('apiaccess', [Auth::user()->id, $locker->id])}}">
                            @csrf
                            <div class="modal-body">
                                <div class="lg-sm-3">
                                    <div class="form-group">
                                        <label class="col-form-label" for="pin">pin</label>
                                        <input type="password" id="pin" name="pin" value="" placeholder="Pin" class="form-control" required>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                <button id="openLocker" type="submit" class="btn btn-primary">Abrir</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
        @endforeach
        @else
        <strong>Não tens cacifos associados!</strong>
        @endif
    </div>
</div>
@endsection