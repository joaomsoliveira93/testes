<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="{{ asset('backend/images/logo.png') }}">

	<title>MyWallet - Dashboard</title>

	<!-- Vendors Style-->
	<link rel="stylesheet" href="{{ asset('backend/css/vendors_css.css') }}">

	<!-- Style-->
	<link rel="stylesheet" href="{{ asset('backend/css/style.css') }}">
	<link rel="stylesheet" href="{{ asset('backend/css/skin_color.css') }}">

	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">

</head>

<body class="hold-transition dark-skin sidebar-mini theme-primary fixed">

	<div class="wrapper">

		@include('admin.body.header')
		<!-- Left side column. contains the logo and sidebar -->
		@include('admin.body.sidebar')

		<!-- Content Wrapper. Contains page content -->
		@yield('admin')

	</div>
	<!-- ./wrapper -->

	<!-- Vendor JS -->
	<script src="{{ asset('backend/js/vendors.min.js') }}"></script>
	<script src="{{ asset('/assets/icons/feather-icons/feather.min.js') }}"></script>
	<script src="{{ asset('/assets/vendor_components/easypiechart/dist/jquery.easypiechart.js') }}"></script>
	<script src="{{ asset('/assets/vendor_components/apexcharts-bundle/irregular-data-series.js') }}"></script>
	<script src="{{ asset('/assets/vendor_components/apexcharts-bundle/dist/apexcharts.js') }}"></script>
	<script src="{{ asset('/assets/vendor_components/datatable/datatables.min.js') }}"></script>
	<script src="{{ asset('backend/js/pages/data-table.js') }}"></script>

	<!-- Charts -->
	<script src="{{ asset('backend/js/pages/widget-inline-charts.js') }}"></script>
	<script src="{{ asset('/assets/vendor_components/jquery-knob/js/jquery.knob.js') }}"></script>
	

	<!-- UAllet Management App -->
	<script src="{{ asset('backend/js/template.js') }}"></script>
	<script src="{{ asset('backend/js/pages/dashboard.js') }}"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
	
	<script type="text/javascript">
		$(function() {
			$(document).on('click', '#delete', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
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
						Swal.fire(
							'Removido!',
							'O Utilizador foi Removido',
							'success'
						)
					}
				})
			});
			$(document).on('click', '#dropCat', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
				Swal.fire({
					title: 'Tem a Certeza?',
					text: "Deseja Remover esta Categoria? Isto irá apagar todas as Despesas, Investimentos e Receitas associadas à mesma. Pretende continuar?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7A15F7',
					cancelButtonColor: '#EF3737',
					confirmButtonText: 'Sim, quero remover!',
					cancelButtonText: 'Não, cancelar!'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = link
						Swal.fire(
							'Removida!',
							'A Categoria foi Removida',
							'success'
						)
					}
				})
			});

			$(document).on('click', '#dropExpense', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
				Swal.fire({
					title: 'Tem a Certeza?',
					text: "Deseja Remover esta Despesa?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7A15F7',
					cancelButtonColor: '#EF3737',
					confirmButtonText: 'Sim, quero remover!',
					cancelButtonText: 'Não, cancelar!'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = link
						Swal.fire(
							'Removida!',
							'A Despesa foi Removida',
							'success'
						)
					}
				})
			});
			$(document).on('click', '#deleteInvestment', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
				Swal.fire({
					title: 'Tem a Certeza?',
					text: "Deseja Remover este Investimento?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7A15F7',
					cancelButtonColor: '#EF3737',
					confirmButtonText: 'Sim, quero remover!',
					cancelButtonText: 'Não, cancelar!'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = link
						Swal.fire(
							'Removido!',
							'O Investimento foi Removido',
							'success'
						)
					}
				})
			});
			$(document).on('click', '#dropRevenue', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
				Swal.fire({
					title: 'Tem a Certeza?',
					text: "Deseja Remover esta Receita?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7A15F7',
					cancelButtonColor: '#EF3737',
					confirmButtonText: 'Sim, quero remover!',
					cancelButtonText: 'Não, cancelar!'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = link
						Swal.fire(
							'Removido!',
							'A Receita foi Removida',
							'success'
						)
					}
				})
			});
			$(document).on('click', '#dropProfile', function(e) {
				e.preventDefault();
				var link = $(this).attr("href");
				Swal.fire({
					title: 'Tem a Certeza?',
					text: "Todos os dados da sua conta serão perdidos! Tem a certeza que pretende continuar?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#7A15F7',
					cancelButtonColor: '#EF3737',
					confirmButtonText: 'Sim, quero remover!',
					cancelButtonText: 'Não, cancelar!'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = link
						Swal.fire(
							'Removido!',
							'A Conta foi Removida',
							'success'
						)
					}
				})
			});

		});
	</script>
	<script>
		@if(Session::has('message'))
		var type = "{{ Session::get('alert-type','info') }}"
		switch (type) {
			case 'info':
				toastr.info(" {{ Session::get('message') }} ");
				break;

			case 'success':
				toastr.success(" {{ Session::get('message') }} ");
				break;

			case 'warning':
				toastr.warning(" {{ Session::get('message') }} ");
				break;

			case 'error':
				toastr.error(" {{ Session::get('message') }} ");
				break;
		}
		@endif
	</script>

</body>

</html>