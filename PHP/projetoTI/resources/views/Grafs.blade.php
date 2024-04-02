@extends('layouts.app')
@section('content')

<div id="top-bar" class=" justify-content-between flex-wrap  align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><span class="fa fa-pie-chart"></span> Gráficos</h1>

    <div class="btn-toolbar mb-2 mb-md-0">

        <div class="btn-group me-2"></div>

    </div>
   

</div>

<div class="content"style="top: 120px!important;">

    <!-- Charting library -->
    
    <script src="https://unpkg.com/chart.js@^2.9.3/dist/Chart.min.js"></script>
    <!-- Chartisan -->    
    <script src="https://unpkg.com/@chartisan/chartjs@^2.1.0/dist/chartisan_chartjs.umd.js"></script>
    <!-- Your application script -->
    <div class="row">
        <h2>Publicações</h2>
        <div style="height: 300px;" id="socialNetworks" class="col-xs-12 col-sm-12 col-md-12 col-lg-4"></div>

        <div style="height: 300px;" id="studies" class="col-xs-12 col-sm-12 col-md-12 col-lg-4"></div>
        <div style="height: 300px;" id="categories" class="col-xs-12 col-sm-12 col-md-12 col-lg-4"></div>
    </div>

    <div class="row">
        <div style="height: 300px;" id="categoriesPosts" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-12"></div>
    </div>

    <script>
        const socialNeworks = new Chartisan({
            el: '#socialNetworks',
            url: "@chart('socialNetworks')",
            hooks: new ChartisanHooks()
                .title('Redes Socias')
                .datasets('doughnut')
                .pieColors(),

        });
        const postsStudies = new Chartisan({
            el: '#studies',
            url: "@chart('postsStudies')",
            hooks: new ChartisanHooks()
                .title('Estudos')
                .datasets('doughnut')
                .pieColors(),

        });
        const postsCategories = new Chartisan({
            el: '#categories',
            url: "@chart('postsCategories')",
            hooks: new ChartisanHooks()
                .title('Categorias')
                .datasets('doughnut')
                .pieColors(),

        });

        const categoriesPosts = new Chartisan({
            el: '#categoriesPosts',
            url: "@chart('categories')",
            type:'bar',
            hooks: new ChartisanHooks()
                .title('Categorias classificadas')
                .beginAtZero()
                .datasets('bar')
                .colors(),
            options: {
                indexAxis: 'y',
            }

        });
    </script>

</div>
@endsection