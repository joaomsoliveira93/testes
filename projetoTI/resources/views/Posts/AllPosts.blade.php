@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-share"></span> Publicações</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a>Publicações</a>
        </li>
    </ol>

</div>
<form method="GET" action="{{route('posts.search')}}">
    @csrf
    <div class="row justify-content-start filters">


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

                <option @if($study==($astudy->studies->id)) selected @endif value="{{$astudy->studies->id}}">{{$astudy->studies->name}}</option>

                @endforeach
            </select>
        </div>
        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>


    </div>
</form>


<div class="content"style="top:315px!important">


    <div class="row">
        @php $i=0 @endphp
        @foreach($activeStudies as $study)
        @foreach($posts as $post)
        @if ($post->study_id == $study->studies->id)
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
                    <h5>{{$post->obs}}</h5>
                    <h5>Estudo:
                        {{$post->studies->name}}
                    </h5>
                    <h5>Resposta:
                       
                        @if($post->studies->finish_at > now())
                        <form method="POST" action="{{route('post.category.add')}}">
                            @csrf
                            <input name="id" type="text" value="{{$post->id}}" class="form-control" placeholder="id" hidden>
                            <input name="page" type="text" value="allPosts" class="form-control" placeholder="allPosts" hidden>
                            <select name="category_id" id="category_id">
    
                                <option @if($post->category_id==null) selected @endif value="0">Não Definida</option>
                                
                                @foreach($studyCategories as $category)
                                @if($category->study_id==$post->study_id)
                                <option @if($post->category_id==$category->category_id) selected @endif value="{{$category->category_id}}">{{$category->categories->name}}</option>
                                @endif
                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-outline-primary">Definir</button>
                        </form>
                        @endif
                    </h5>
                </div>
                <div class="card__footer">

                    <a class="btn btn-outline-info" href="{{route('post.view',$post->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endif
        @endforeach
        @endforeach

        @if($i==0)
        <h2>Sem Publicações</h2>
        @endif
    </div>
</div>


</div>
@endsection