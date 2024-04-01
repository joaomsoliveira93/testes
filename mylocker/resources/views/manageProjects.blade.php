@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Gerir Projetos</h2>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Gerir projetos</a>
            </li>
        </ol>
    </div>

    <a href="" class="btn btn-success btn-rounded floatButton" data-toggle="modal" data-target="#addProject"> <span class="fa fa-plus"></span> Novo Projeto</a>

</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce" >


    <div class="ibox-content m-b-sm border-bottom" >
        <form type="get" action="{{url('/projects/search')}}">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="col-form-label" for="mec">ID</label>
                        <input type="text" id="mec" name="mec" value="{{$id}}" placeholder="ID" class="form-control">
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="col-form-label" for="name">Nome</label>
                        <input type="text" id="name" name="name" value="{{$name}}" placeholder="Nome" class="form-control">
                    </div>
                </div>   
                <div class="col-sm-4">                    
                        <button type="submit"  value="Procurar" class="btn btn-primary" style="height:35px;margin-top:34px;"> <a class="fa fa-search"></a> </button>                    
                </div>             
            </div>
            
            
        </form>
       
    

    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny default breakpoint footable-loaded" data-page-size="15">
                        <thead>
                            <tr>
                                <th data-hide="phone" class="footable-visible footable-sortable">ID<span class="footable-sort-indicator"></span></th>
                                <th data-hide="phone" class="footable-visible footable-sortable">Nome<span class="footable-sort-indicator"></span></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($projects as $project)
                            <tr class="footable-even">
                                <td class="footable-visible">
                                    {{ $project->id }}
                                </td>
                                <td class="footable-visible">
                                    {{ $project->name }}
                                </td>
                                <td class="text-right footable-visible footable-last-column">
                                    <div class="btn-group">
                                        <a href="{{route('viewproject', $project->id)}}" class="btn btn-xs btn-outline btn-primary">Detalhes </a>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="footable-visible">
                                    {{$projects->links('layouts.paginationlinks')}}
                                   
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <div class="modal inmodal" id="addProject" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <i class="fa fa-folder-open modal-icon"></i>
                    <h4 class="modal-title">Adicionar um Projeto</h4>
                </div>

                <form method="POST" action="{{route('addproject')}}">
                    @csrf
                    <div class="modal-body">

                       
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Nome</label>
                                <input type="text" id="name" name="name" value="" placeholder="Nome" class="form-control" required>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Adicionar projeto</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</div>


@endsection