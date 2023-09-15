@component('mail::message')
# Bem vindo {{$user->name}}

O seu registo na aplicação foi bem sucedido, deve proceder a ativação da sua conta atraves da ligação abaixo.

@component('mail::button', ['url' => route('email.confirm', ['id'=>$user->id] ) ] )
Confirmar E-mail
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
