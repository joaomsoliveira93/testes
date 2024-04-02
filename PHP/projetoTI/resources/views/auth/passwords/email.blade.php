@extends('layouts.appBasic')

@section('content')

<div class="card">
    <div class="card-header"><a style="color:white;margin-right:20px" href="{{route('login')}}"><span class="fa fa-arrow-left">    </a>SocialClassify - Recuperar</div>

    <div >
        @if (session('status'))
        <div role="alert">
            {{ session('status') }}
        </div>
        @endif

        <form method="POST" action="{{ route('resetpassword.email') }}">
            @csrf

            <div class="row mb-3">
                <label for="email">E-Mail</label>

                <div class="col-md-6">
                    <input name="email" id="email" type="email"  required autocomplete="email" autofocus>

                    @error('email')
                    <span role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <div >
                <div >
                    <button type="submit" >
                        Recuperar Palavra-passe
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

@endsection