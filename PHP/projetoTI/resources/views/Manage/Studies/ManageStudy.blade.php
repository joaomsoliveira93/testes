@extends('layouts.app')
@section('content')

<div id="top-bar" class="background-container justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-edit"></span> <span class="fa fa-book"></span> Gerir Estudo</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{route('studies.manage')}}">Gerir Estudos</a>
        </li>
        <li class="breadcrumb-item">
            <a>Detalhes do Estudo</a>
        </li>
    </ol>

</div>



<form method="GET" action="{{route('manage.study.search',$study->id)}}">
    @csrf
    <div class=" background-container row justify-content-start filters">

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
                <option @if($socialNetwork=='Facebook' ) selected @endif value="Facebook">Facebook</option>
                <option @if($socialNetwork=='Linkedin' ) selected @endif value="Linkedin">LinkedIn</option>
            </select>
        </div>

        <div class="col-12  col-lg-2 ">
            <button type="submit" class="btn btn-outline-primary">Procurar</button>
        </div>


    </div>
</form>




<div class="content background-container" style="top:275px!important">

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="card">
                <div class="card__header">
                    <h2>{{$study->name}}
                        <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editStudy">Editar <span class="fa fa-edit"></span> </a>
                        <a id="dropStudy" class="btn btn-outline-danger" href="{{ route('study.drop', $study->id) }}">Apagar <span class="fa fa-times"></span></a>
                    </h2>
                </div>
                <div class="card__body">
                    <p> {{$study->obs}}</p>
                    <h6>Data de inicio: {{$study->created_at}}</h6>
                    <h6>Data de fim: {{$study->finish_at}}</h6>
                </div>
                <div class="card__footer">
                    <h5>Respostas Possíveis <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#addCategory">Adicionar <span class="fa fa-plus"></span> </a></h5>
                    @if(count($studyCategories)==0)
                    <h5>Este estudo ainda não tem categorias!</h5>
                    @else

                    @foreach($studyCategories as $category)
                    <span class="border border-info border-3 p-2 me-2 rounded-3">
                        {{$category->categories->name}}
                        <a id="dropCategoryStudy" class="btn btn-outline-danger p-1 mb-1 btnDSC" href="{{ route('study.category.drop', [$study->id,$category->categories->id]) }}">
                            <span class="fa fa-times"></span>
                        </a>
                    </span>
                    @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <h2>Publicações Relacionadas <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#addPosts">Adicionar <span class="fa fa-plus"></span> </a></h2>
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

                    <a class="btn btn-outline-info" href="{{route('post.manage',$post->id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>


<div  class="modal fade" id="editStudy" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-book"></span> Editar estudo</h4>
            </div>

            <form method="POST" action="{{route('study.edit')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{$study->id}}" class="form-control" placeholder="Nome" hidden>
                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="{{$study->name}}" class="form-control" placeholder="Nome">
                    </div>

                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea name="obs" type="text" class="form-control" placeholder="Descrição">{{$study->obs}}</textarea>
                    </div>

                    <div class="form-group">
                        <label>Data de inicio:</label>
                        <input name="start" type="date" value="{{$study->created_at}}" class="form-control" pattern="\d{4}-\d{2}-\d{2}">
                    </div>
                    <div class="form-group">
                        <label>Data de fim:</label>
                        <input name="end" type="date" value="{{$study->finish_at}}" class="form-control">
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

<div class="modal fade" id="addCategory" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#newCategory">Criar <span class="fa fa-plus"></span> </a> <span class="fa fa-book"></span> Adicionar Resposta</h4>
            </div>

            <form method="POST" action="{{route('study.category.add')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{$study->id}}" class="form-control" placeholder="Nome" hidden>

                    <select style="z-index:999" name="category" id="category">
                        @foreach ($categories as $category)
                        <option value="{{$category->id}}">{{$category->name}}</option>
                        @endforeach
                    </select>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-outline-primary">Adicionar</button>
                </div>

            </form>
        </div>
    </div>
</div>

<div  class="modal fade" id="newCategory" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addCategory"><span aria-hidden="true" class="fa fa-arrow-left"></span></button>

                <h4 class="modal-title"><span class="fa fa-book"></span> Criar Resposta</h4>
            </div>

            <form method="POST" action="{{route('category.new')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{$study->id}}" class="form-control" placeholder="Nome" hidden>
                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="" class="form-control" placeholder="Nome">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-outline-primary">Criar e adicionar</button>
                </div>

            </form>
        </div>
    </div>


</div>
<div  class="modal fade" id="addPosts" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title"><span class="fa fa-share"></span> Adicionar Publicações</h4>
            </div>

            <form method="POST" action="{{route('study.addPosts')}}">
                @csrf
                <div class="modal-body">
                    <input name="id" type="text" value="{{$study->id}}" class="form-control" placeholder="Nome" hidden>
                    <div class="form-group">
                        <table class="footable table table-stripped toggle-arrow-tiny default breakpoint footable-loaded" id="postsTable" name="">
                            <thead>
                                <tr>
                                    <th data-hide="phone" class="footable-visible footable-sortable">Link</th>
                                    <th data-hide="phone" class="footable-visible footable-sortable">Rede Social</th>
                                    <th class="text-right footable-visible footable-last-column" data-sort-ignore="true"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="footable-even">
                                    <td class="footable-visible">
                                        <input type="text" name="link[]" class="form-control" required>
                                    </td>
                                    <td class="footable-visible">
                                        <select name="socialNetwork[]" id="socialNetwork" class="form-control">
                                            <option value="Facebook" selected>Facebook</option>
                                            <option value="Linkedin" >Linkedin</option>
                                        </select>
                                    </td>
                                    <td class="footable-visible">
                                        <a class="btn btn-xs btn-outline btn-danger Eliminar"><span class="fa fa-times"></span></a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <a class="btn btn-outline-primary" id="addPost">Adicionar <span class="fa fa-plus"></span></a>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-outline-primary">Adicionar</button>
                </div>

            </form>
        </div>
    </div>
    @endsection