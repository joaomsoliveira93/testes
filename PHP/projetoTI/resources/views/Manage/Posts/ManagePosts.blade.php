@extends('layouts.app')
@section('content')

<div id="top-bar" class="background-container justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-edit"></span> <span class="fa fa-share"></span> Gerir Publicações</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
  
        <li class="breadcrumb-item">
            <a>Gerir Publicações
            </a>
        </li>
    </ol>

</div>

<form method="GET" action="{{route('posts.manage.search')}}">
    @csrf
    <div class="row justify-content-start filters background-container">


        <div>
            <h5>Filtros</h5>
        </div>
        @php
        if(!isset($socialNetwork)){
            $socialNetwork=0;
        }

        if(!isset($study)){
            $study=0;
        }
        @endphp
        <div class="col-12   col-lg-2">
            Rede Social
            <select name="socialNetwork" id="socialNetwork">
                <option @if($socialNetwork==0) selected @endif value="0">Todas</option>
                <option @if($socialNetwork=='Facebook') selected @endif value="Facebook">Facebook</option>
                <option @if($socialNetwork=='Linkedin') selected @endif value="Linkedin">LinkedIn</option>
            </select>
        </div>


        <div class="col-12  col-lg-2">
            Estudo
            <select name="study" id="study">
                <option @if($study==0) selected @endif value="0">Todos</option>
                @foreach($activeStudies as $astudy)

                <option @if($study==($astudy->id)) selected @endif value="{{$astudy->id}}">{{$astudy->name}}</option>

                @endforeach
            </select>
        </div>
        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>


    </div>
</form>



<div class="content background-container"style="top:310px!important">


    <div class="row">
    @php $i=0 @endphp
        @foreach ($posts as $post)
        @php $i++ @endphp
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div class="card">
                <div class="card__header">

                    <span style="font-size:20px" class="fa 
                    @if ($post->social_network=='Linkedin')fa-linkedin
                    @elseif($post->social_network == 'Facebook')
                    fa-facebook-official
                    @endif"></span>

                </div>
                <div class="card__body">
                    <iframe src="{{$post->link}}"></iframe>
                    <h5>Estudo:
                        @if ($post->studies!=null)
                        {{$post->studies->name}}
                        @else
                        Não definido
                        @endif
                    </h5>
                   <h5>Resposta:
                        @if($post->categories==null)
                        Não Definida
                        @else
                        {{$post->categories->name}} 
                        <h6>Categorizada por: {{$post->users->name}} a {{$post->date}}</h6>
                        @endif
                    </h5>
                </div>
                <div class="card__footer">


                    <a class="btn btn-outline-info" href="{{route('post.manage',$post->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endforeach
        @if($i==0)
        <h2>Sem Publicações</h2>
        @endif
    </div>
</div>

</div>
<div class="float-button background-container" data-bs-toggle="modal" data-bs-target="#addPost"> <span class="fa fa-plus"></span> </div>
<div class="modal fade" id="addPost" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-share"></span> Adicionar Publicação</h4>
            </div>

            <form method="POST" action="{{route('post.add')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="" class="form-control" placeholder="id" hidden>
                    <div class="form-group">
                        <label>Endereço</label>
                        <input name="link" type="text" value="" class="form-control" placeholder="Endereço">
                    </div>

                    <div class="form-group">
                        <label>Rede Social:</label>
                        <select name="social_network" id="social_network" class="form-control">
                            <option value="Facebook" selected>Facebook</option>
                            <option value="Linkedin" selected>Linkedin</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea name="obs" type="text" value="" class="form-control" placeholder="Observações"></textarea>
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