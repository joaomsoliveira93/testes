<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>UALocker</title>

    <!-- Scripts -->

    <link rel="shortcut icon" href="{{ asset('img/fav.png') }}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">    

    <link href="./css/animate.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/app.css">
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="./css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="./css/plugins/steps/jquery.steps.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">  
    <link href="./css/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
    <link href="./css/plugins/colorpicker/bootstrap-colorpicker.min.css" rel="stylesheet">
    <link href="./css/plugins/cropper/cropper.min.css" rel="stylesheet">
    <link href="./css/plugins/switchery/switchery.css" rel="stylesheet">
    <link href="./css/plugins/nouslider/jquery.nouislider.css" rel="stylesheet">
    <link href="./css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="./css/plugins/ionRangeSlider/ion.rangeSlider.css" rel="stylesheet">
    <link href="./css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">
    <link href="./css/plugins/clockpicker/clockpicker.css" rel="stylesheet">
    <link href="./css/plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet">
    <link href="./css/plugins/select2/select2.min.css" rel="stylesheet">
    <link href="./css/plugins/select2/select2-bootstrap4.min.css" rel="stylesheet">
    <link href="./css/plugins/touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet">
    <link href="./css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
    <!-- Styles -->

</head>

<body style="background-color:#f3f3f4">

    <div id="app">
        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <!-- Mainly scripts -->
    <script src="./js/jquery-3.1.1.min.js"></script>
    <script src="./js/popper.min.js"></script>
    <script src="./js/bootstrap.js"></script>
    <script src="./js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="./js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="./js/inspinia.js"></script>
    <script src="./js/plugins/pace/pace.min.js"></script>

    <!-- Steps -->
    <script src="./js/plugins/steps/jquery.steps.min.js"></script>

    <!-- Jquery Validate -->
    <script src="./js/plugins/validate/jquery.validate.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.9.2/parsley.min.js" integrity="sha512-eyHL1atYNycXNXZMDndxrDhNAegH2BDWt1TmkXJPoGf1WLlNYt08CSjkqF5lnCRmdm3IrkHid8s2jOUY4NIZVQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="./js/app.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="./js/plugins/select2/select2.full.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    
    <script>
        $(function() {
                $(document).on('click', '#cancelRequest', function(e) {
                    e.preventDefault();
                    var link = $(this).attr("href");
                    console.log(link);
                    Swal.fire({
                        title: 'Tem a Certeza?',
                        text: "Todos os dados serão perdidos!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7A15F7',
                        cancelButtonColor: '#EF3737',
                        confirmButtonText: 'Sim!',
                        cancelButtonText: 'Não!'
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
        switch (type) {
            case 'info':
                toastr.info(" {{ Session::get('message') }} ","",options);
                break;

            case 'success':
                toastr.success(" {{ Session::get('message') }} ","",options);
                break;

            case 'warning':
                toastr.warning(" {{ Session::get('message') }} ","",options);
                break;

            case 'error':
                toastr.error(" {{ Session::get('message') }} ","",options);
                break;
        }
        @endif
    </script>

</body>

</html>