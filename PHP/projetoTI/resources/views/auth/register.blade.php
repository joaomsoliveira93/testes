@extends('layouts.appBasic')

@section('content')
<head>
<meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<div class="container">
    <div class="card">
        <div class="card-header"><a style="color:white;margin-right:20px" href="{{route('login')}}"><span class="fa fa-arrow-left">    </a>SocialClassify - Registar</div>
   

        <form method="POST" action="{{ route('register.account') }}">
            @csrf
            
            @if (!isset($user)) {{$user=null}} @endif
            @if(isset($network))
                 
                @if($network=='Facebook')
                <span style="font-size:40px" class="fa fa-facebook-official"></span>
                    <input type="hidden" name="nt" value="Facebook" >
                @elseif($network=='Linkedin')
                <span style="font-size:40px"class="fa fa-linkedin-square"></span>
                    <input name="nt"  value="Linkedin" type="hidden">
                @elseif($network=='Twitter')
                <span style="font-size:40px"class="fa fa-twitter"></span>
                    <input name="nt" value="Twitter" type="hidden">

                @endif
            @else
            <input name="nt" id="nt" value="" type="hidden">

            @endif
            <div>
                <label for="name" >Nome</label>

                <div class=>
                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" 
                    value="@if($user== null){{old('name')}}@else{{$user->name}}@endif" required autocomplete="name" autofocus>

                    @error('name')
                    <span  role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>
            <input name="id" id="id" value="@if($user!== null){{$user->id}}@endif"type="hidden">

            <div>
                <label for="email" >E-mail</label>

                <div>
                    <input name="email" id="email" type="email" required autocomplete="email"
                    value="@if($user!== null){{$user->email}}@endif">

                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <div >
                <label for="password" >Palavra-passe</label>

                <div class="col-md-6">
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <div >
                <label for="password-confirm" >Confirmar Palavra-Passe</label>

                <div >
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                </div>
            </div>

            <h3>Registar-se com: </h3>
                <div class="social-ntw">
                    <a class="" href="{{ route('facebook.redirect') }}">
                        <span style="font-size:40px" class="fa fa-facebook-official"></span>
                    </a>
                    <a class="" href="{{ route('linkedin.redirect') }}">
                        <span style="font-size:40px" class="fa fa-linkedin"></span>
                    </a>
                    
                </div>

            <div >
                <div>
                    <button type="submit">
                        Registar
                    </button>
                </div>
            </div>
        </form>

    </div>

</div>
@endsection