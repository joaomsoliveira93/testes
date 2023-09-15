@extends('layouts.app')

@section('content')
<div class="container">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">UA <span class="fa fa-lock"></span> </h1>

            </div>
            <h3>Bem-vindo ao UALocker</h3>
            <p>Insira o seu E-mail para que possamos enviar-lhe uma nova Palavra-Passe</p>

            <form method="Post" action="{{route('forgotpasswordreset')}}">
                @csrf
                <div class="form-group">

                    <input id="email" type="text" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Nome de Utilizador" required >
                    
                </div>               
                
                <button type="submit" class="btn btn-primary block full-width m-b">Recuperar Palavra-Passe</button>

            </form>

        </div>
    </div>
</div>
@endsection