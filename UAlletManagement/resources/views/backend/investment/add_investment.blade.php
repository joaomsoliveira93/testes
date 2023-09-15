@extends('admin.admin_master')
@section('admin')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <div class="container-full">

        <section class="content">

            <!-- Basic Forms -->
            <div class="box">
                <div class="box-header with-border">
                    <h4 class="box-title">Adicionar Investimento</h4>
                    <a href="{{ route('category.add') }}" style="float:right" class="btn btn-rounded btn-primary mb-5">Adicionar Categoria</a>
                    <h6 class="box-subtitle">Preencha todos os campos necessários para proceder com o registo do
                        investimento</h6>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col">
                            <form method="POST" action="{{ route('investment.add.submit') }}">
                                @csrf
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <h5>Categoria<span class="text-danger">*</span></h5>
                                                    <div class="controls">
                                                        <select name="category" id="categories" required=""
                                                            class="form-control">
                                                            <option value="">Selecione a Categoria do Investimento
                                                            </option>
                                                            @foreach ($categorias as $cat )
                                                            <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> <!-- End Col Md-6 -->

                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <h5>Investimento<span class="text-danger">*</span></h5>
                                                    <div class="controls">
                                                        <input type="text" name="name" class="form-control" required="">
                                                    </div>
                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group validate">
                                                    <h5>Montante <span class="text-danger">*</span></h5>
                                                    <div class="input-group"> <span class="input-group-addon"></span>
                                                        <input type="number" name="amount" class="form-control"
                                                            required=""
                                                            data-validation-required-message="Este campo é necessário!"
                                                            step=".01"
                                                            aria-invalid="false"> <span
                                                            class="input-group-addon">€</span> </div>
                                                </div>
                                            </div>
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <h5>Data de Início<span class="text-danger">*</span></h5>
                                                    <div class="controls">
                                                        <input type="date" name="startDate" class="form-control"
                                                            required=""
                                                            data-validation-required-message="This field is required"
                                                            aria-invalid="false">
                                                        <div class="help-block"></div>
                                                    </div>

                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5>Hora de Início<span class="text-danger">*</span></h5>
                                                <div class="form-group row">
                                                    <div class="col-md-12">
                                                        <input class="form-control" type="time" name="startTime">
                                                    </div>
                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group validate">
                                                    <h5>Montante de Fecho</span></h5>
                                                    <div class="input-group"> <span class="input-group-addon"></span>
                                                        <input type="number" name="closeAmount" class="form-control"
                                                            aria-invalid="false"> <span
                                                            class="input-group-addon">€</span> </div>
                                                </div>
                                            </div>
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <h5>Data de Fecho</h5>
                                                    <div class="controls">
                                                        <input type="date" name="endDate" class="form-control">
                                                        <div class="help-block"></div>
                                                    </div>

                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5>Hora de Fecho</h5>
                                                <div class="form-group row">
                                                    <div class="col-md-12">
                                                        <input class="form-control" type="time" name="endTime">
                                                    </div>
                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                        </div> <!-- End Row -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="text-xs-right">
                                                    <br>
                                                    <input type="submit" class="btn btn-rounded btn-info mb-5"
                                                        value="Adicionar">
                                                </div>
                                            </div> <!-- End Col Md-6 -->
                                            <div class="col-md-6">
                                            </div> <!-- End Col Md-6 -->
                                        </div> <!-- End Row -->

                                    </div>
                            </form>

                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->

        </section>

    </div>
</div>
@endsection