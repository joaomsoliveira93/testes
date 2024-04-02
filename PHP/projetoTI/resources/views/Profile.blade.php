@extends('layouts.app')
@section('content')



<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom background-container">
    <h1 class="h2"><span class="fa fa-user"></span> Perfil</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
    <hr>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a>Perfil</a>
        </li>

    </ol>

</div>

<div class="content background-container" style="top: 200px!important;">


    <div class="row">
        <h2>{{Auth::user()->name}}</h2>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="card">
                <div class="card__header">
                    <h3>Dados Pessoais</h3>
                </div>
                <div class="card__body">

                    E-mail: {{Auth::user()->email}}
                </div>
                <div class="card__footer">

                    <a id="editProfileButton" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editProfile">Editar Dados Pessoais <span class="fa fa-edit"></span></a>
                    <a class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#changePassword">Alterar Palavra-passe <span class="fa fa-lock"></span></a>
                    <a id="dropAccount" class="btn btn-outline-danger" href="{{ route('account.drop', Auth::user()->id) }}">Apagar conta <span class="fa fa-times"></span></a>
                </div>
            </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div class="card">
                <div class="card__header">
                    <h3>Redes Sociais</h3>
                    <span style="font-size:40px " class="fa fa-facebook-official"> </span>
                    @if($fb!=null)
                    {{$fb->email}}
                    <a id="removeFacebook" class="btn btn-outline-danger" href="{{ route('facebook.drop', $fb->user_id) }}">Remover <span class="fa fa-times"></span></a>

                    @else
                    Sem conta associada
                    <a class="btn btn-outline-success" href="{{ route('facebook.redirect') }}">Adicionar <span class="fa fa-plus"></span></a>
                    @endif
                    <br>
                    <span style="font-size:40px " class="fa fa-linkedin"></span>
                    @if($lin!=null)
                    {{$lin->email}}

                    <a id="removeLinkedin" class="btn btn-outline-danger" href="{{ route('linkedin.drop', $lin->user_id) }}">Remover <span class="fa fa-times"></span></a>

                    @else
                    Sem conta associada
                    <a class="btn btn-outline-success" href="{{ route('linkedin.redirect') }}">Adicionar <span class="fa fa-plus"></span></a>
                    @endif

                </div>
                <div class="card__body">


                </div>
                <div class="card__footer">

                </div>
            </div>

        </div>


    </div>


    <div class="row">
        <h2>Estudos que participa</h2>
    </div>

    <div class="row">
        @foreach($activeStudies as $study)
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
            <div class="card">
                <div class="card__header">
                    <h1>{{$study->studies->name}}</h1>
                </div>
                <div class="card__body">
                    <p> {{$study->studies->obs}}</p>

                </div>
                <div class="card__footer">
                    <a class="btn btn-outline-info" href="{{route('study.view',$study->study_id)}}">Mais Detalhes <span class="fa fa-info"></span></a>
                </div>
            </div>
        </div>
        @endforeach


    </div>
</div>


<div class="modal fade" id="editProfile" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-user"></span> Editar Dados Pessoais</h4>
            </div>

            <form method="POST" action="{{route('profile.update')}}">
                @csrf
                <div class="modal-body">

                    <div class="form-group">
                        <label>Nome</label>
                        <input name="name" type="text" value="{{ Auth::user()->name }}" class="form-control" placeholder="Nome">
                    </div>

                    <div class="form-group">
                        <label>E-mail</label>
                        <input name="email" type="text" value="{{ Auth::user()->email }}" class="form-control" placeholder="E-mail">
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

<div class="modal fade" id="changePassword" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                <h4 class="modal-title"> <span class="fa fa-key"></span> Alterar Palavra-passe</h4>
            </div>

            <form method="POST" action="{{route('password.update')}}">
                @csrf
                <div class="modal-body">

                    <div class="form-group">
                        <label>Palavra-passe atual</label>
                        <input id="oldpassword" type="password" name="password" placeholder="Palavra-passe atual" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Nova Palavra-Passe</label>
                        <input id="newPassword" type="password" name="newPassword" placeholder="Nova Palavra-passe" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Confirmar Palavra-passe</label>
                        <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirmar Palavra-passe" class="form-control">
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