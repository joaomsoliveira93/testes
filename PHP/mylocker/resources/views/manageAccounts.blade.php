@extends('layouts.admin_master')
@section('admin')

<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Gerir contas</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item">
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Gerir contas</a>
            </li>
        </ol>
    </div>

    <a href="" class="btn btn-success btn-rounded floatButton" data-toggle="modal" data-target="#addAccount"> <span class="fa fa-plus"></span> Nova conta</a>

</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce" >


    <div class="ibox-content m-b-sm border-bottom" >
        <form type="get" action="{{url('/accounts/search')}}">
            <div class="row">
                <div class="col-sm-1">
                    <div class="form-group">
                        <label class="col-form-label" for="mec">Nº mec</label>
                        <input type="text" id="mec" name="mec" value="{{$id}}" placeholder="Nº Mec" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="col-form-label" for="name">Nome</label>
                        <input type="text" id="name" name="name" value="{{$name}}" placeholder="Nome" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="col-form-label" for="email">E-mail</label>
                        <input type="text" id="email" name="email" value="{{$email}}" placeholder="E-mail" class="form-control">
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="col-form-label" for="type">Tipo</label>
                        <select name="type" id="type" class="form-control">
                            <option value="" 
                            @if($type == '')
                                selected="selected"
                            @endif
                            >Todos</option>
                            <option value="user" 
                            @if($type == 'user')
                                selected="selected"
                            @endif
                            >Utilizador</option>
                            <option value="manager"
                            @if($type == 'manager')
                                selected="selected"
                            @endif
                            >Gestor</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label class="col-form-label" for="status">Estado</label>
                        <select name="status" id="status" class="form-control">
                            <option value="" 
                            @if($status == '')
                                selected="selected"
                            @endif
                            >Todos</option>
                            <option value="1"                            
                            @if($status == '1')
                                selected="selected"
                            @endif
                            >Activo</option>
                            <option value="0"
                            @if($status == '0')
                                selected="selected"
                            @endif
                            >Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-1">
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
                                <th data-hide="phone" class="footable-visible footable-sortable">Estado<span class="footable-sort-indicator"></span></th>
                                <th data-hide="phone" class="footable-visible footable-sortable">Tipo<span class="footable-sort-indicator"></span></th>
                                <th class="text-right footable-visible footable-last-column" data-sort-ignore="true">Ação</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $user)
                            <tr class="footable-even">
                                <td class="footable-visible">
                                    {{ $user->name }}
                                </td>
                                <td class="footable-visible">
                                    {{ $user->email }}
                                </td>

                                <td class="footable-visible">
                                    @if ($user->isActive == 1)
                                    <span class="label label-primary">Ativo</span>
                                    @else
                                    <span class="label label-danger">Inativo</span>
                                    @endif
                                </td>
                                <td>
                                    @if ($user->type == 'manager')
                                        <span class="label ">Gestor</span>
                                    @else
                                        <span class="label ">Utilizador</span>
                                    @endif
                                </td>
                                <td class="text-right footable-visible footable-last-column">
                                    <div class="btn-group">
                                        <a href="{{route('viewaccount', $user->id)}}" class="btn btn-xs btn-outline btn-primary">Detalhes </a>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="footable-visible">
                                    {{$users->links('layouts.paginationlinks')}}
                                   
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <div class="modal inmodal" id="addAccount" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <i class="fa fa-user modal-icon"></i>
                    <h4 class="modal-title">Adicionar uma conta</h4>
                </div>

                <form method="POST" action="{{route('addaccount')}}">
                    @csrf
                    <div class="modal-body">

                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="nmec">Nº mecanográfico</label>
                                <input type="text" id="nmec" name="nmec" value="" placeholder="Nº Mecanográfico" class="form-control" required>
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
                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="type">Tipo de conta</label>
                                <select name="type" id="type" class="form-control">
                                    <option value="user" selected="">Utilizador</option>
                                    <option value="manager">Gestor</option>
                                </select>
                            </div>
                        </div>
                        <div class="lg-sm-2">
                            <div class="form-group">
                                <label class="col-form-label" for="status">Estado</label>
                                <select name="status" id="status" class="form-control">
                                    <option value="1" selected="">Ativo</option>
                                    <option value="0">Inativo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Criar conta</button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</div>


@endsection