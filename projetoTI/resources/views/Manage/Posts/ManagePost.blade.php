@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom background-container" >
    <h1 class="h2"><span class="fa fa-edit"></span> <span class="fa fa-share"></span> Detalhes da Publicação</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
      
        <li class="breadcrumb-item">
            <a href="{{route('posts.manage')}}">Gerir Publicações</a>
        </li>
        <li class="breadcrumb-item">
            <a>Detalhes da publicação</a>
        </li>
    </ol>

</div>
<div class="content background-container"style="top:205px!important">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-12">
            <div class="card">
                <div class="card__header">
                    <span style="font-size:20px" class="fa @if ($post->social_network=='Linkedin')fa-linkedin
                    @elseif($post->social_network == 'Facebook')
                    fa-facebook-official
                    @endif"></span>
                    <div style="margin-right:0">
                        <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editPost">Editar <span class="fa fa-edit"></span> </a>
                        <a id="dropPost" class="btn btn-outline-danger" href="{{ route('post.drop', $post->id) }}">Apagar <span class="fa fa-times"></span></a>
                    </div>

                </div>
                <div class="card__body">
                    <iframe src="{{$post->link}}"></iframe>
                    <h5>{{$post->obs}}</h5>

                </div>
                <div class="card__footer">

                    <h5>Estudo:
                        @if ($post->studies!=null)
                        {{$post->studies->name}} <a id="dropPostStudy" class="btn btn-outline-danger" href="{{ route('post.study.drop', $post->id) }}">Apagar <span class="fa fa-times"></span></a>
                        @else
                    </h5>
                    <form method="POST" action="{{route('post.study.add')}}">
                        @csrf
                        <input name="id" type="text" value="{{$post->id}}" class="form-control" placeholder="id" hidden>
                        <select name="study_id" id="study_id">
                            <option value="0" selected>Não definido</option>
                            @foreach($studies as $study)
                            <option value="{{$study->id}}">{{$study->name}}</option>
                            @endforeach
                        </select>
                        <button type="submit" class="btn btn-outline-primary">Definir</button>
                    </form>

                    @endif
                    </h5>
                    <h5>Resposta:
                        @if($post->categories==null)
                        Não Definida
                        @else
                        {{$post->categories->name}} <a id="dropCategoryPost" class="btn btn-outline-danger" href="{{ route('post.category.drop', $post->id) }}">Apagar <span class="fa fa-times"></span></a>
                        <h6>Categorizada por: {{$post->users->name}} a {{$post->date}}</h6>
                        @endif
                    </h5>


                </div>
            </div>
        </div>
    </div>


</div>
<div class="modal fade " id="editPost" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog ">
        <div class="modal-content animated bounceInRight ">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-share"></span> Editar Publicação</h4>
            </div>

            <form method="POST" action="{{route('post.edit')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{$post->id}}" class="form-control" placeholder="id" hidden>
                    <div class="form-group">
                        <label>Endereço</label>
                        <input name="link" type="text" value="{{$post->link }}" class="form-control" placeholder="Endereço">
                    </div>

                    <div class="form-group">
                        <label>Rede Social:</label>
                        <select name="social_network" id="social_network" class="form-control">
                            <option value="Facebook" @if($post->social_network=='Facebook') selected @endif >Facebook</option>
                            <option value="Linkedin" @if($post->social_network=='Linkedin') selected @endif >Linkedin</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea name="obs" type="text" value="" class="form-control" placeholder="Observações">{{$post->obs}}</textarea>

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


</div>
@endsection