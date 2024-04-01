@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Detalhes do pedido</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{ route('home') }}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{ route('locker-requests') }}">Requisições de cacifos</a>
            </li>
            <li class="breadcrumb-item">
                <a>Detalhes da Requisição</a>
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
                                Detalhes da Requisição
                            </h2>

                            <hr>



                            <h4>Projeto: {{ $req->name }}</h4>



                            <div class="small text-muted" style="display:inline-block">
                                <h5>Responsáveis associados:</h5>
                                @foreach($tea as $teacher)
                                <p>{{ $teacher->name }} -> {{ $teacher->email }} </p>
                                @endforeach

                            </div>
                            <div class="small m-t-md">
                                <h4>Membros do grupo:</h4>
                                <ul>
                                    @foreach ($mem as $member)
                                    <li>
                                        <p>{{ $member->name }} -> {{ $member->email }}</p>
                                    </li>
                                    @endforeach
                                </ul>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        @if($req->status!=2)
        <div class="col-lg-6">
            <div class="ibox ">
                <div class="ibox-title">
                    <h2 class="font-bold m-b-xs">Escolha um cacifo</h2>
                </div>
                
                    <div class="ibox-content" >                

                        @if (!empty($cabinets[0]))
                        @foreach ($cabinets as $cabinet)
                        
                        <div class=" col-lg-12">
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5> {{ $cabinet->local }} </h5>
                                {{$cabinets->links('layouts.paginationlinks')}}
                            </div>
                            <div class="ibox-content">
                                <div class="row">
                                    @if (!empty($lockers[0]))
                                    @foreach ($lockers as $locker)
                                    @if ($locker->cabinet_id == $cabinet->id)
                                   
                                    @if ($locker->isFree == 1)
                                    @if(count($reservedLockers)!=0)
                                        @foreach ($reservedLockers as $reservedLocker)
                                            @if($reservedLocker->id == $locker->id )
                                            <button disabled type="button" class="btn btn-w-s btn-warning m-xs">C{{$locker->position}}</button>   
                                            @else
                                            <button id="selectLocker"  href="{{ route('updaterequest', ['id'=>$req->id,'locker'=>$locker->id,'state'=>1]) }}" type="button" class="btn btn-w-s btn-primary m-xs">C{{$locker->position}}</button>                                     
                                            @endif
                                        @endforeach
                                    @else
                                        <button id="selectLocker"  href="{{ route('updaterequest', ['id'=>$req->id,'locker'=>$locker->id,'state'=>1]) }}" type="button" class="btn btn-w-s btn-primary m-xs">C{{$locker->position}}</button>
                                    @endif     
                                    @else
                                    <button type="button" class="btn btn-w-s btn-danger m-xs" disabled>C{{$locker->position}}</button>
                                    @endif

                                    @endif
                                    @endforeach
                                    @else
                                    <strong>Este Armário não possui Cacifos</strong>
                                    @endif
                                </div>
                                

                            </div>
                            <div class="ibox-footer">
                                <span>Legenda:</span>
                                <button disabled type="button" class="btn btn-w-s btn-warning m-xs">Cacifo Reservado</button>  
                                <button disabled type="button" class="btn btn-w-s btn-danger m-xs">Cacifo Ocupado</button> 
                                <button disabled type="button" class="btn btn-w-s btn-primary m-xs">Cacifo Livre</button> 
                            </div>
                        </div>
                    </div>
                    @endforeach
                @endif
                
                
            
            </div>


        </div>
@endif
    </div>

</div>

@endsection