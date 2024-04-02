@php
$prefix = Request::route()->getPrefix();

@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>SocialClassify</title>


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{asset('./css/bootstrap.min.css')}}" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="{{asset('./css/style.css')}}" rel="stylesheet" />
    <link href="{{asset('./css/toastr.css')}}" rel="stylesheet" />
  



</head>

<body >
    <header class="navbar navbar-dark sticky-top bg-dark  p-0 shadow background-container">
        <div class="custom-menu ">
            <button type="button" id="sidebarCollapse" class="btn btn-primary"></button>
        </div>
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="{{route('home')}}">Olá, {{Auth::user()->name}}</a>


        <a id="btn-sign-out" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            Sair<span class="fa fa-sign-out"></span>
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>

    </header>



    <nav id="sidebar" class="position-fixed h-100 background-container">

        <ul class="list-unstyled components mb-5">
            <li class="{{ ($prefix == '/studies' )?'active':'' }}">
                <a class="nav-link " href="{{route('studies.all')}}">
                    <span class="fa fa-book"></span>
                    Estudos
                </a>
            </li>

            <li class="{{ ($prefix == '/posts' )?'active':'' }}">
                <a class="nav-link " href="{{route('posts.all')}}">
                    <span class="fa fa-share"></span>
                    Publicações
                </a>
            </li>

            <li class="{{ ($prefix == '/profile' )?'active':'' }}">
                <a class="nav-link " href="{{route('profile.view')}}">
                    <span class="fa fa-user"></span>
                    Perfil
                </a>
            </li>
        </ul>
        @if(Auth::user()->type>0)
        <ul class="list-unstyled components mb-5">

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Gestão</span>
            </h6>

            <ul class="nav flex-column mb-2">
                <li class="nav-item {{ ($prefix == '')?'active':'' }}">
                    <a class="nav-link" aria-current="page" href="{{route('home')}}">
                        <span class="fa fa-pie-chart"></span>
                        Gráficos
                    </a>
                </li>
                @if(Auth::user()->type==2)
                <li class="nav-item {{ ($prefix == '/manageusers' )?'active':'' }}">
                    <a class="nav-link" href="{{route('accounts.view')}}">
                        <span class="fa fa-users "></span>
                        Utilizadores
                    </a>
                </li>
                @endif
                <li class="nav-item {{ ($prefix == '/managestudies' )?'active':'' }}">
                    <a class="nav-link " href="{{route('studies.manage')}}">
                        <span class="fa fa-edit "></span>
                        <span class="fa fa-book "></span>
                        Estudos
                    </a>
                </li>
                <li class="nav-item {{ ($prefix == '/manageposts' )?'active':'' }}">
                    <a class="nav-link " href="{{route('posts.manage')}}">
                        <span class="fa fa-edit "></span>
                        <span class="fa fa-share "></span>
                        Publicações
                    </a>
                </li>
            </ul>
            @endif
    </nav>


    @yield('content')




    <script src="{{asset('./js/jquery-3.1.1.min.js')}}"></script>
    <script src="{{asset('./js/popper.min.js')}}"></script>
    <script src="{{asset('./js/bootstrap.min.js')}}"></script>
    <script src="{{asset('./js/bootstrap.bundle.min.js')}}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript" src="{{asset('./js/toastr.min.js')}}"></script>
    <script src="{{asset('./js/app.js')}}"></script>
 
    <script>
      
        $(function() {

            $(document).on('click', '#removeFacebook', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar a ligação à sua conta do Facebook",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#removeLinkedin', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar a ligação à sua conta do Linkedin",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropStudy', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar este estudo",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropAccount', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar este Utilizador",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropPost', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar esta publicação",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropPostStudy', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja eliminar a publicação do estudo",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropCategoryPost', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja a eliminar a Resposta da publicação",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });

            $(document).on('click', '#dropCategoryStudy', function(e) {
                e.preventDefault();
                var link = $(this).attr("href");
                console.log(link);
                Swal.fire({
                    title: 'Tem a Certeza?',
                    text: "Deseja a eliminar a Resposta do estudo",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7A15F7',
                    cancelButtonColor: '#EF3737',
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não, cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = link
                    }
                })
            });
        });
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