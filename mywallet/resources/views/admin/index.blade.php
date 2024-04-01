@extends('admin.admin_master')
@section('admin')

	<!-- Gráficos DashBoard -->
	<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_investimentos.js') }}"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_despesas.js') }}"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_categorias_inv.js') }}"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_categorias_desp.js') }}"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_categorias_rec.js') }}"></script>
	<script src="{{ asset('backend/js/dashboard_graph/graph_inv_term.js') }}"></script>
    <div class="content-wrapper">
        <div class="container-full">
            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="box bg-info box-inverse bg-img" >
                        <div class="box-body text-center">
                            <img src="{{ asset('backend\images\logo.png') }}" class="mt-50" alt="">
                            <div class="max-w-1000 mx-auto">
                                <h2 class="text-white mb-20 font-weight-500" id="usernamesetter">Bem-Vindo,
                                    {{ Auth::user()->name }}</h2>
                                <p class="text-white-50 mb-10 font-size-20">Aqui poderá consultar os seus Investimentos,
                                    Despesas e Receitas de
                                    forma a ter uma visão geral dos mesmos, possibilitando que pratique uma boa gestão das
                                    suas posses.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Investimentos por Categoria</h4>
                            </div>
                            <div id="invcategorias" class="box-body"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Despesas por Categoria</h4>
                            </div>
                            <div id="despcategorias" class="box-body"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Receitas por Categoria</h4>
                            </div>
                            <div id="reccategorias" class="box-body"></div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Investimentos por Categoria</h4>
                            </div>

                            <div id="investimentos"></div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Investimentos</h4>
                            </div>
                            <div id="inv_term"></div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="box">
                            <div class="box-header">
                                <h4 class="box-title">Despesas</h4>
                            </div>
                            <div id="pagamentos"></div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->
        </div>
    </div>

@endsection
