@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                <h3 class="box-header">Detalhes da Despesa</h3>
                <div class="box-body">

                    <div class="form-group pb-10">
                        <h5>Categoria</h5>
                        <div class="controls">
                        @foreach ($categorias as $cat )                        
                            @if ($cat->id == $expense->category_id)
                               {{ $cat->name }}
                            @endif                            
                        @endforeach

                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Despesa</h5>
                        <div class="controls">
                            {{$expense->Titulo}}
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Valor</h5>
                        <div class="controls">
                            {{$expense->Montante}}
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Data de Criação</h5>
                        <div class="controls">
                            {{$expense->Data}}                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Hora de Criação</h5>
                        <div class="controls">
                            {{$expense->Hora}}                            
                        </div>
                    </div>

                </div>

                
                <div class="col-md-6" style="margin-bottom: 20px;">
                    <div class="text-xs-right">
                        <a href="{{ route('expense.edit', $expense->id) }}"> <span class=" btn btn-rounded btn-info mb-5">Editar Despesa</span></a>
                    </div>
                </div> <!-- End Col Md-6 --> 

                <!-- /.content -->
        </section>
    </div>
</div>


@endsection
