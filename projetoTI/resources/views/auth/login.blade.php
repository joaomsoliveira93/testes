@extends('layouts.appBasic')

@section('content')

<div class="card">

    <div class="card-header">  SocialClassify - Entrar</div>

    <p>O socialClassify permite classificar publicações de várias Redes Sociais </p>

    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div>
            <label for="email">E-mail</label>

            <div>
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

        <div>
            <label for="password">Palavra-Passe</label>

            <div>
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

        <div>
            <div class="col-md-6 offset-md-4">
                <div>
                    <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                    <label for="remember">
                        Lembrar-me
                    </label>
                </div>
            </div>
        </div>

        <div>
            <div>
                <button type="submit">
                    Iniciar Sessão
                </button>
                <h3>Iniciar Sessão com: </h3>
                <div class="social-ntw">
                    <a class="" href="{{ route('facebook.redirect') }}">
                        <span style="font-size:40px" class="fa fa-facebook-official"></span>
                    </a>
                    <a class="" href="{{ route('linkedin.redirect') }}">
                        <span style="font-size:40px" class="fa fa-linkedin"></span>
                    </a>
                   
                </div>

                @if (Route::has('password.request'))
                {{$user=null}}
                <a class="btn btn-link" href="{{ route('password.request')}}">
                    Esqueceu a sua Palavra-Passe
                </a>
                @endif


            </div>
        </div>
    </form>

    <label>Não tem uma conta?</label>
    <a href="{{ route('register')}}">
        Criar uma conta
    </a>

</div>

@endsection