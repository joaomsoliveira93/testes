<!DOCTYPE html>
<html {{ str_replace('_', '-', app()->getLocale()) }}>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">


    <title>UALocker</title>

    <link rel="shortcut icon" href="{{ asset('./img/fav.png') }}">
    <link href="{{ asset('./css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{ asset('./font-awesome/css/font-awesome.css')}}" rel="stylesheet">

    <link href="{{ asset('./css/animate.css')}}" rel="stylesheet">
    <link href="{{ asset('./css/style.css')}}" rel="stylesheet">
    <link href="{{ asset('./css/app.css')}}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">

</head>

<body style="background-color:#f3f3f4!important;height:80%!important" >
    <div class="row wrapper border-bottom white-bg animated fadeInRight" style="margin-left:20px!important;margin-right:20px!important;margin-top:5px!important">
        <div class="col-lg-10">
        <h1>UA <span class="fa fa-lock"></span> </h1>
            @if($req->status == 0)
            <h2>Esta Requisição não foi aprovada pelo Gestor do Sistema</h2>
            <a  type="button" class="btn btn-w-s btn-primary m-xs" href="/">Página Inicial</a>
            
            @elseif($req->status==2)
            <h2>Esta Requisição já se encontra aprovada pelo Responsável</h2>
            <a  type="button" class="btn btn-w-s btn-primary m-xs" href="/">Página Inicial</a>
            @elseif($req->status==1)
            <h2>Detalhes da Requisição</h2>
            @endif
        </div>

    </div>
    @if($req->status == 1)
    <div class="wrapper animated fadeInRight" style="margin-top:10px!important">
        <div class="row">
            <div class="col-lg-6">
                <div class="ibox product-detail">
                    <div class="ibox-content">
                        <div class="row">
                            <div>
                                <h2 class="font-bold m-b-xs">
                                    Detalhes da Requisição
                                </h2>
                                <hr>
                                <h4>Projeto: {{ $req->name }}</h4>
                                <div class="small text-muted" style="display:inline-block">
                                    <h5>Responsáveis associados:</h5>
                                    @foreach($tea as $teacher)
                                    <p>{{ $teacher->name }} -> {{ $teacher->email }} </p>
                                    @endforeach
                                </div>
                                <div class="small m-t-md">
                                    <h4>Membros do grupo:</h4>
                                    <ul>
                                        @foreach ($mem as $member)
                                        <li>
                                            <p>{{ $member->name }} -> {{ $member->email }}</p>
                                        </li>
                                        @endforeach
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="ibox ">
                    <div class="ibox-title">
                        <h2 class="font-bold m-b-xs">Armário: {{$req->local}} - Cacifo {{$req->position}}</h2>                        
                    </div>

                    <div class="ibox-content">
                    <button id="approve" type="button" class="btn btn-w-s btn-primary m-xs"href="{{ route('confirmaccess', ['id'=>$req->id,'group_id'=>$req->group_id,'locker'=>$req->locker_id]) }}">Aprovar Pedido</button>
                    <button id="deny" type="button" class="btn btn-w-s btn-danger m-xs" href="{{ route('denyaccess', ['id'=>$req->id,'group_id'=>$req->group_id]) }}">Recusar Pedido</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
    @endif

    <!-- Mainly scripts -->

    <script src="{{ asset('./js/jquery-3.1.1.min.js')}} " language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/popper.min.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/bootstrap.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/plugins/metisMenu/jquery.metisMenu.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/plugins/slimscroll/jquery.slimscroll.min.js')}}" language="JavaScript" type="text/javascript"></script>

    <!-- Custom and plugin javascript -->
    <script src="{{ asset('./js/inspinia.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/plugins/pace/pace.min.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="{{ asset('./js/app.js')}}" language="JavaScript" type="text/javascript"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    <script>
        $(function() {
            $(document).on('click', '#approve', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Confirma os dados do grupo?",
                    icon: 'warning',
                    showLoaderOnConfirm:true,
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim, Estão corretos!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                        Swal.fire({
                            icon: 'success',
                            title: 'A processar dados',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            allowEnterKey:false,
                            showConfirmButton: false
                        });
                    }
                })
            });
            
            $(document).on('click', '#deny', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Pretende eliminar este pedido de cacifo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim, Eliminar!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

        })
    </script>
</body>

</html>