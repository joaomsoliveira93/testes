@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                <form method="POST" action="{{ route('investment.close.submit', $investment->id) }}">
                    @csrf
                    <h3 class="box-header">Fechar Investimento {{ $investment->Nome }}</h3>
                    <div class="box-body">
                        <div class="form-group pb-10">
                            <h5>Valor de Fecho<span class="text-danger">*</span></h5>
                            <input type="text" name="closeAmount" class="form-control"
                            required="" data-validation-required-message="Este campo é obrigatório para o fecho!" step=".01">
                        </div>
                        <div class="form-group pb-10">
                            <h5>Data de Fecho</h5>
                            <input type="date" name="endDate" class="form-control" value="{{ $investment->DataFecho }}">
                        </div>

                        <div class="form-group ">
                            <h5>Hora de Fecho</h5>
                            <input type="time" name="endTime" class="form-control" value="{{ $investment->HoraFecho }}">
                        </div>

                    </div>
                    <!-- /.box-body -->
                    <div class="col-md-6" style="margin-bottom: 20px; margin-left: 5px">
                        <div class="text-xs-right">
                            <input type="submit" class="btn btn-rounded btn-info mb-5" value="Aceitar Alterações">
                        </div>
                    </div> <!-- End Col Md-6 -->
                </form>
                <!-- /.content -->
            </div>
        </section>
    </div>
</div>


@endsection
