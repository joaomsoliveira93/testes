@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-book"></span> Detalhes do Estudo</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
     
        <li class="breadcrumb-item">
            <a href="{{route('studies.all')}}">Estudos</a>
        </li>
        <li class="breadcrumb-item">
            <a>Detalhes do Estudo</a>
        </li>
    </ol>

</div>


<div>
<form method="GET" action="{{route('study.post.search',$study->id)}}">
    @csrf
    <div class="row justify-content-start filters">

        <div>
            <h5>Filtros</h5>
        </div>
        @php
        if(!isset($socialNetwork)){
            $socialNetwork=0;
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

        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>


    </div>
</form>


</div>

<div class="content"style="top:275px!important">

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="card">
                <div class="card__header">
                    <h2>{{$study->name}}
                        @if($study->finish_at > now())
                        @php $a = false @endphp
                        @foreach($activeStudies as $active)
                        @if($active->studies->id == $study->id)
                        @php $a = true @endphp
                        @endif
                        @endforeach

                        @if($a != true)
                        <a href="{{route('study.enter',[$study->id,'view'])}}" class="btn btn-outline-success">Participar <span class="fa fa-edit"></span> </a>

                        @else
                        <a href="{{route('study.exit',[$study->id,'view'])}}" class="btn btn-outline-danger">Sair <span class="fa fa-sign-out"></span></a>
                        @php $a = false @endphp
                        @endif
                        @endif
                    </h2>
                </div>
                <div class="card__body">
                    <p> {{$study->obs}}</p>
                    <h6>Data de inicio: {{$study->created_at}}</h6>
                    <h6>Data de fim: {{$study->finish_at}}</h6>
                </div>
                <div class="card__footer">
                <h5>Respostas Possíveis: </h5>
                    @if(count($studyCategories)==0)
                    <h5>Este estudo ainda não tem categorias!</h5>
                    @else
                    @foreach($studyCategories as $category)
                    {{$category->categories->name}}; 
                    @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>

    <div class="row">

        <h2>Publicações Relacionadas</h2>
        @if(count($posts)==0)
        <h6>Este estudo não tem publicações associadas</h6>
        @endif
        @foreach ($posts as $post)
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
                    <h5>{{$post->obs}}</h5>
                    <h5>Estudo:
                        @if ($post->studies!=null)
                        {{$post->studies->name}}
                        @else
                        Não definido
                        @endif
                    </h5>
                    <h5>Categoria:
                        @if($post->categories==null)
                        Não Definida
                        @else
                        {{$post->categories->name}}
                        @endif
                    </h5>
                </div>
                <div class="card__footer">

                    <a class="btn btn-outline-info" href="{{route('post.view',$post->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endforeach

    </div>
</div>
@endsection