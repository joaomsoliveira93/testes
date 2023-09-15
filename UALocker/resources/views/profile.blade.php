@extends('layouts.admin_master')


@section('admin')
<script >
    console.log('ola');
    @if(count($errors)>0)
        var profileerror = true;
    @endif
</script>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>Perfil</h2>
        <ol class="breadcrumb" >
            <li class="breadcrumb-item" >
                <a href="{{route('home')}}">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a>Perfil</a>
            </li>
        </ol>
    </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight ecommerce">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">
                    <div class="form-group row ">
                        <a href="" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#editProfile">Editar <i class="fa fa-edit"></i> </a>
                        <a href="" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#changePassword">Alterar Palavra-Passe <i class=" fa fa-key"></i> </a>
                        <a href="" class="btn btn-outline btn-info m-xs" data-toggle="modal" data-target="#changePin">Alterar Pin <i class=" fa fa-key"></i> </a>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-10">
                            <p>{{ $user->name }}</p>

                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                            <p>{{ $user->email }}</p>
                        </div>
                    </div>

                    <div class="modal inmodal" id="editProfile" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content animated bounceInRight">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                                    <i class="fa fa-user modal-icon"></i>
                                    <h4 class="modal-title">Editar Perfil</h4>
                                </div>

                                <form method="POST" action="{{route('editprofile')}}">
                                    @csrf
                                    <div class="modal-body">
                                        
                                        <div class="form-group">
                                            <label>Nome</label>
                                            <input name="name" type="text" value="{{ $user->name }}" class="form-control" placeholder="Nome" >
                                        </div>

                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input name="email" type="text" value="{{ $user->email }}" class="form-control" placeholder="E-mail">
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" class="btn btn-primary">Guardar Alterações</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>


                    <div class="modal inmodal" id="changePassword" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content animated bounceInRight">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                                    <i class="fa fa-key modal-icon"></i>
                                    <h4 class="modal-title">Alterar Palavra-passe</h4>
                                </div>

                                <form method="POST" action="{{route('editpassword')}}">
                                    @csrf
                                    <div class="modal-body">

                                        <div class="form-group">
                                            <label>Palavra-passe atual</label>
                                            <input id="oldpassword" type="password" name="password" placeholder="Palavra-passe atual" class="form-control" >
                                        </div>

                                        <div class="form-group">
                                            <label>Nova Palavra-Passe</label>
                                            <input id="newPassword" type="password" name="newPassword" placeholder="Nova Palavra-passe" class="form-control" >
                                        </div>

                                        <div class="form-group">
                                            <label>Confirmar Palavra-passe</label>
                                            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirmar Palavra-passe" class="form-control" >
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" class="btn btn-primary">Guardar Alterações</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>

                    <div class="modal inmodal" id="changePin" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content animated bounceInRight">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                                    <i class="fa fa-key modal-icon"></i>
                                    <h4 class="modal-title">Alterar Pin</h4>
                                </div>

                                <form method="POST" action="{{route('editpin')}}">
                                    @csrf
                                    <div class="modal-body">

                                        <div class="form-group">
                                            <label>Pin atual</label>
                                            <input id="oldpin" name="oldpin" type="password" placeholder="Pin atual" class="form-control digits" >
                                        </div>

                                        <div class="form-group">
                                            <label>Novo pin</label>
                                            <input id="newPin" name="newpin" type="password" placeholder="Novo pin" class="form-control" >
                                        </div>

                                        <div class="form-group">
                                            <label>Confirmar novo Pin</label>
                                            <input id="confirmPin" name="confirmPin" type="password" placeholder="Confirmar novo pin" class="form-control" >
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" class="btn btn-primary">Guardar alterações</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>

@endsection