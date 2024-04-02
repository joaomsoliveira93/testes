@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Gerir Responsáveis</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Gerir Responsáveis</a>
            </li>
        </ol>
    </div>

    <a href="" class="btn btn-success btn-rounded floatButton" data-toggle="modal" data-target="#addTeacher"> <span class="fa fa-plus"></span> Novo Responsável</a>

</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce" >


    <div class="ibox-content m-b-sm border-bottom" >
        <form type="get" action="{{url('/manager/search')}}">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="col-form-label" for="mec">Id</label>
                        <input type="text" id="mec" name="mec" value="{{$id}}" placeholder="Id" class="form-control">
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
                        <label class="col-form-label" for="email">E-mail</label>
                        <input type="text" id="email" name="email" value="{{$email}}" placeholder="E-mail" class="form-control">
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                    <button type="submit"  value="Procurar" class="btn btn-primary" style="height:35px;margin-top:34px;"> <a class="fa fa-search"></a> </button>
                    </div>
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
                                <th data-hide="phone" class="footable-visible footable-sortable">Nome<span class="footable-sort-indicator"></span></th>
                                <th data-hide="phone" class="footable-visible footable-sortable">E-mail<span class="footable-sort-indicator"></span></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($teachers as $teacher)
                            <tr class="footable-even">
                                <td class="footable-visible">
                                    {{ $teacher->name }}
                                </td>
                                <td class="footable-visible">
                                    {{ $teacher->email }}
                                </td>
                                <td class="text-right footable-visible footable-last-column">
                                    <div class="btn-group">
                                        <a href="{{route('viewmanager', $teacher->id)}}" class="btn btn-xs btn-outline btn-primary">Detalhes </a>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="footable-visible">
                                    {{$teachers->links('layouts.paginationlinks')}}
                                   
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <div class="modal inmodal" id="addTeacher" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <i class="fa fa-address-card modal-icon"></i>
                    <h4 class="modal-title">Adicionar um Responsável</h4>
                </div>

                <form method="POST" action="{{route('addmanager')}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="nmec">Id</label>
                                <input type="text" id="nmec" name="nmec" value="" placeholder="Id" class="form-control" required>
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="name">Nome</label>
                                <input type="text" id="name" name="name" value="" placeholder="Nome" class="form-control" required>
                            </div>
                        </div>
                        <div class="lg-sm-3">
                            <div class="form-group">
                                <label class="col-form-label" for="email">E-mail</label>
                                <input type="text" id="email" name="email" value="" placeholder="E-mail" class="form-control" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Adicionar Responsável</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</div>


@endsection