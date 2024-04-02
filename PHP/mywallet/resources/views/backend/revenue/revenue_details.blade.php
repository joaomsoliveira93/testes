@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                <h3 class="box-header">Detalhes da Receita</h3>
                <div class="box-body">

                    <div class="form-group pb-10">
                        <h5>Categoria</h5>
                        <div class="controls">
                        @foreach ($categorias as $cat )                        
                            @if ($cat->id == $revenue->category_id)
                               {{ $cat->name }}
                            @endif                            
                        @endforeach

                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Receita</h5>
                        <div class="controls">
                            {{ $revenue->Titulo }}
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Valor</h5>
                        <div class="controls">
                            {{ $revenue->Montante }}
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Data de Criação</h5>
                        <div class="controls">
                            {{ $revenue->Data }}                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Hora de Criação</h5>
                        <div class="controls">
                            {{ $revenue->Hora }}                            
                        </div>
                    </div>

                </div>

                
                <div class="col-md-6" style="margin-bottom: 20px;">
                    <div class="text-xs-right">
                        <a href="{{ route('revenue.edit', $revenue->id) }}"> <span class=" btn btn-rounded btn-info mb-5">Editar Receita</span></a>
                    </div>
                </div> <!-- End Col Md-6 --> 

                <!-- /.content -->
        </section>
    </div>
</div>


@endsection
