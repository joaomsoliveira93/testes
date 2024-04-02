@extends('layouts.appBasic')

@section('content')

<div class="card">
    <div class="card-header">  </span> SocialClassify - Recuperar Palavra-passe</div>


    <form method="POST" action="{{ route('user.resetpassword') }}">
        @csrf
        <input id="id"  name="id" value="{{$user->id}}" hidden >
        <h3>Olá, {{$user->name}}</h3>
        <div class="row mb-3">
            <label for="password" class="col-md-4 col-form-label text-md-end">Nova Palavra-Passe</label>

            <div class="col-md-6">
                <input name="password" id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <label for="passwordconfirm" class="col-md-4 col-form-label text-md-end">Confirmar Nova Palavra-Passe</label>

            <div class="col-md-6">
                <input name="passwordconfirm" id="passwordconfirm" type="password" class="form-control"  required autocomplete="new-password">
            </div>
        </div>

        <div class="row mb-0">
            <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn btn-primary">
                    Restaurar Palavra-Passe
                </button>
            </div>
        </div>
    </form>


</div>
@endsection