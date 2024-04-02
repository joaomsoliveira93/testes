<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>SocialClassify</title>
    <!--Material icons-->
  
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="{{asset('./css/style.css')}}" rel="stylesheet" />
    <link href="{{asset('./css/toastr.css')}}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('./css/auth.css')}}">

</head>

<body id="appBasic">





    @yield('content')
    <script src="{{asset('./js/jquery-3.1.1.min.js')}}"></script>
    <script src="{{asset('./js/popper.min.js')}}"></script>
    <script src="{{asset('./js/bootstrap.bundle.min.js')}}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript" src="{{asset('./js/toastr.min.js')}}"></script>
    <script src="{{asset('./js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('./js/toastr.min.js')}}"></script>
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