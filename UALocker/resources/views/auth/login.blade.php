@extends('layouts.app')

@section('content')
<div class="container">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">UA <span class="fa fa-lock"></span> </h1>

            </div>
            <h3>Bem-vindo ao UALocker</h3>
            <p>Criado para aceder aos armários de cacifos no teu campus</p>

            <form method="Post" action="{{route('login')}}">
                @csrf
                <div class="form-group">

                    <input id="email" type="text" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Nome de Utilizador" required >
                    
                </div>
                <div class="form-group">
                    <input id="password" type="password" class="form-control @error('email') is-invalid @enderror" name="password" placeholder="Palavra-Passe" required="">
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                            <label class="form-check-label" for="remember">
                                {{ __('Lembrar-me') }}
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-secondary block full-width m-b">Entrar</button>

                <a href="{{route('forgotpassword')}}"><small>Esqueceste a Palavra-Passe?</small></a>
                <p class="text-muted text-center"><small>Não tens uma conta?</small></p>
                <a class="btn btn-secondary block full-width m-b" href="{{route('makerequest')}}">Realiza um Pedido</a>
            </form>

        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="js/jquery-3.1.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.js"></script>
</div>
@endsection