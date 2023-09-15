<!DOCTYPE html>
<html>


<!-- Mirrored from webapplayers.com/inspinia_admin-v2.9.4/empty_page.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 12 Apr 2021 15:25:42 GMT -->
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Guia de estilos</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">

    <!-- FooTable -->
    <link href="css/plugins/footable/footable.core.css" rel="stylesheet">

    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>

<body class="">

<div id="wrapper">

    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element ">
                        <h1 class="font-bold m-l-xl" style="color:white">Guia de Estilos</h1>
                    </div>
                    <div class="logo-element">
                        <ul class="nav metismenu">
                            <li class="nav-item">
                                UA &nbsp;<i class="fa fa-lock"></i>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="{{Route('home')}}"><i class="fa fa-home"></i> <span class="nav-label">Voltar a aplicação</span></a>
                </li>

                <li>
                    <a href="{{Route('typography')}}"><i class="fa fa-header"></i> <span class="nav-label">Tipografia</span></a>
                </li>


                <li>
                    <a href="{{Route('forms')}}"><i class="fa fa-edit"></i> <span class="nav-label">Formulários</span></a>
                </li>
                <li>
                    <a href="{{Route('panels')}}"><i class="fa fa-laptop"></i> <span class="nav-label">Botões e Painéis</span></a>
                </li>

                <li>
                    <a href="{{Route('lists')}}"><i class="fa fa-edit"></i> <span class="nav-label">Listas</span></a>
                </li>

                <li>
                    <a href="{{Route('miscellanous')}}"><i class="fa fa-globe"></i> <span class="nav-label">Miscelânea</span></a>
                </li>




            </ul>

        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top  " role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>

                </div>

        </div>
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>{{$title}}</h2>

            </div>

        </div>

        <div class="wrapper wrapper-content">
            @yield('style')
        </div>
        <div class="footer">
            <div class="float-right">
                © 2021 <a href="https://www.ua.pt/pt/estga/">ESTGA</a> Projeto Temático de Desenvolvimento Web - <a href="https://www.ua.pt/">Universidade de Aveiro</a>
            </div>
            <div>
                <a href="/estilos">Guia de Estilos</a>
            </div>
        </div>

    </div>
</div>

<!-- Mainly scripts -->
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>

<!-- FooTable -->
<script src="js/plugins/footable/footable.all.min.js"></script>

<!-- Page-Level Scripts -->
<script>
    $(document).ready(function() {

        $('.footable').footable();

    });

</script>


</body>


<!-- Mirrored from webapplayers.com/inspinia_admin-v2.9.4/empty_page.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 12 Apr 2021 15:25:42 GMT -->
</html>
