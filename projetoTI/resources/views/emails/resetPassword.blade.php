@component('mail::message')
# Caro, {{$user->name}}

Foi realizado um pedido de recuperção da Palavra-passe, para continuar deverá seguir a ligação abaixo.

@component('mail::button', ['url' => route('user.resetpassword.page', ['id'=>$user->id] ) ] )
Recuperar Palavra-Passe
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
