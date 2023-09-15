@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-share"></span> Detalhes da Publicação</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
      
        <li class="breadcrumb-item">
            <a href="{{route('posts.all')}}">Publicações</a>
        </li>
        <li class="breadcrumb-item">
            <a>Detalhes da Publicação</a>
        </li>
    </ol>

</div>

<div class="content"style="top:205px!important">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-12">
            <div class="card">
                <div class="card__header">
                    <span style="font-size:20px" class="fa @if ($post->social_network=='Linkedin')fa-linkedin
                    @elseif($post->social_network == 'Facebook')
                    fa-facebook-official
                    @endif"></span>

                </div>
                <div class="card__body">
                    <iframe src="{{$post->link}}"></iframe>
                    <h5>{{$post->obs}}</h5>
                    <h5>
                        @if ($post->studies->finish_at < now())
                        <p class="text-danger">Estudo: {{$post->studies->name}}, terminado a {{$post->studies->finish_at}}</p>
                        @elseif($post->studies!=null)
                            Estudo: {{$post->studies->name}}                       
                        @else
                        Estudo não definido
                        @endif
                    </h5>
                    <h5>Resposta:
                        @if($post->studies->finish_at > now())
                        <form method="POST" action="{{route('post.category.add')}}">
                            @csrf
                            <input name="id" type="text" value="{{$post->id}}" class="form-control" placeholder="id" hidden>
                            <input name="page" type="text" value="postDetails" class="form-control" placeholder="allPosts" hidden>
                            <select name="category_id" id="category_id">
    
                                <option @if($post->category_id==null) selected @endif value="0">Não Definida</option>
                                
                                @foreach($studyCategories as $category)

                                <option @if($post->category_id==$category->category_id) selected @endif value="{{$category->category_id}}">{{$category->categories->name}}</option>

                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-outline-primary">Definir</button>
                        </form>
                        @else
                        {{$post->categories->name}}
                        @endif
                    </h5>
                </div>
                <div class="card__footer">


                </div>
            </div>
        </div>
    </div>


</div>
@endsection