@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                @foreach ($userInvestment as $investment)
                <h3 class="box-header">{{ $investment->invName }}</h3>
                <div class="box-body">
                    <div class="form-group pb-10">
                        <h5>Categoria</h5>
                        <div class="controls">
                            {{ $investment->catName }}

                        </div>
                    </div>
                    <div class="form-group pb-10">
                        <h5>Valor</h5>
                        <div class="controls">
                            {{ $investment->invAmount }} €
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Data de Criação</h5>
                        <div class="controls">
                            {{ $investment->invStartDate }}
                            
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Hora de Criação</h5>
                        <div class="controls">
                            {{ $investment->invStartTime }}
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Valor de Fecho</h5>
                        <div class="controls">
                            {{ $investment->endAmount }} €
                        </div>
                    </div>

                    <div class="form-group pb-10">
                        <h5>Data de Fecho</h5>
                        <div class="controls">
                            {{ $investment->invEndDate }}
                        </div>
                    </div>

                    <div class="form-group ">
                        <h5>Hora de Fecho</h5>
                        <div class="controls">
                            {{ $investment->invEndTime }}
                        </div>
                    </div>

                @endforeach
                </div>
                <!-- /.box-body -->
                <div class="col-md-6" style="margin-bottom: 20px">
                    <div class="text-xs-right">
                        <a href="{{ route('investment.edit', $investment->invId) }}"> <span class=" btn btn-rounded btn-info mb-5">Editar Investimento</span></a>
                    </div>
                </div> <!-- End Col Md-6 --> 

                <!-- /.content -->
        </section>
    </div>
</div>


@endsection
