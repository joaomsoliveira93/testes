@php
$prefix = Request::route()->getPrefix();
$route = Route::current()->getName();

$user= Auth::user();
@endphp

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

<body class="">


    <div id="wrapper">
        @if (Auth::user()->userType == 'manager')
        <nav class="navbar-default navbar-static-side " style="position:fixed;z-index:1500" role="navigation">

            <div class="sidebar-collapse">
                <ul class="nav metismenu" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element ">
                            <h1 class="font-bold m-l-xl" style="color:white">UA &nbsp;<i class="fa fa-lock" ></i></h1>
                        </div>
                        <div class="logo-element">
                            <ul class="nav metismenu">
                                <li class="nav-item">
                                    UA &nbsp;<i class="fa fa-lock"></i>
                                </li>
                            </ul>
                        </div>
                    </li>


                    <li class="treeview {{ ($prefix == 'cabinetstatus')?'active':'' }}">
                        <a href="{{ route('cabinetstatus') }}" title="Cabinet Status"><i class="fa fa-lock"></i> <span class="nav-label">Estado dos Armários </span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'releaselockers')?'active':'' }}">
                        <a href="{{route('releaselockers')}}" title="Release Lockers"><i class="fa fa-unlock"></i> <span class="nav-label">Libertar Cacifos</span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'accesses')?'active':'' }}">
                        <a href="{{route('accesses.all')}}" title="Manage Accounts"><i class="fa fa-retweet"></i> <span class="nav-label">Histórico de Acessos</span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'locker-requests')?'active':'' }}">
                        <a href="{{route('locker-requests')}}" title="Locker Requests"><i class="fa fa-question"></i> <span class="nav-label">Requisições de Cacifos</span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'accounts')?'active':'' }}">
                        <a href="{{route('manageaccounts')}}" title="Manage Accounts"><i class="fa fa-users"></i> <span class="nav-label">Gerir Contas</span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'teachers')?'active':'' }}">
                        <a href="{{route('manageteachers')}}" title="Manage Teachers"><i class="fa fa-address-card"></i> <span class="nav-label">Gerir Docentes</span></a>
                    </li>
                    <li class="treeview {{ ($prefix == 'projects')?'active':'' }}">
                        <a href="{{route('manageprojects')}}" title="Manage Projects"><i class="fa fa-folder-open"></i> <span class="nav-label">Gerir Projetos</span></a>
                    </li>
                </ul>

            </div>
        </nav>
        @endif

        @if (Auth::user()->userType == 'manager')
        <div id="page-wrapper" class="gray-bg">
            @else
            <div id="page-wrapper" class="gray-bg" style="left:0!important;width:100%">
                @endif

                <div id="header" class="row border-bottom fixed-header">
                    <nav class="navbar navbar-static-top  " role="navigation" style="margin-bottom: 0;">
                        <div class="navbar-header">
                            @if (Auth::user()->userType == 'manager')
                            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                            @endif
                        </div>
                        <ul class="nav navbar-top-links navbar-right">

                          


                            <li class="dropdown m-r-md">
                                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                    <span class="block m-t-xs font-bold">{{Auth::user()->name}}<b class="caret"></b></span>
                                </a>
                                <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a class="dropdown-item" href="{{route('profile')}}">Perfil</a></li>
                                    <li class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="{{ route('user.logout') }}">Sair</a></li>
                                </ul>
                            </li>
                        </ul>

                    </nav>
                </div>


                <div style="margin-top:70px">
                    @yield('admin')
                </div>





                <div class="footer">
                    <div class="float-right">
                        © 2021 <a href="https://www.ua.pt/pt/estga/">ESTGA</a> Projeto Temático de Desenvolvimento Web - <a href="https://www.ua.pt/">Universidade de Aveiro</a>
                    </div>
                    <div>
                        <a href="{{route('estilos')}}">Guia de Estilos</a>
                    </div>
                </div>

            </div>
        </div>

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
                $(document).on('click', '#dropAccount', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Remover este Utilizador?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, quero remover!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '#dropCabinet', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Remover este Armário?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, quero remover!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '#dropTeacher', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Remover este Docente?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, quero remover!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '.dropGroupMember', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Remover este Membro do Grupo?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, quero remover!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '#resetPassword', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Restaurar a Palavra-Passe deste utilizador?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, Restaurar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '#resetPin', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja Restaurar o Pin deste utilizador?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, Restaurar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });                

                $(document).on('click', '#release', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja libertar este cacifo?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, libertar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link;
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

                $(document).on('click', '#selectLocker', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Pretende atribuir este cacifo ao grupo?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, atribuir!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link;
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

                $(document).on('click', '#releaseAllLockers', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja libertar todos os cacifos?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, libertar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link;
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

                

                $(document).on('click', '#dropProject', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja eliminar este projeto?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });

                $(document).on('click', '.dropProjectTeacher', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Deseja eliminar o docente do projeto?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim, eliminar!',
                        cancelButtonText: 'Não, cancelar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link
                        }
                    })
                });
            })
        </script>

        <script>
            var options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "slideDown",
                "hideMethod": "slideUp"
            }
            
            @if(Session::has('message'))
            var type = "{{ Session::get('alert-type','info') }}"
            console.log(type);
            switch (type) {
                case 'info':
                    toastr.info(" {{ Session::get('message') }} ", "", options);
                    break;

                case 'success':
                    toastr.success(" {{ Session::get('message') }} ", "", options);
                    break;

                case 'warning':
                    toastr.warning(" {{ Session::get('message') }} ", "", options);
                    break;

                case 'error':
                    toastr.error(" {{ Session::get('message') }} ", "", options);
                    break;
            }
            @endif

        </script>


</body>

</html>