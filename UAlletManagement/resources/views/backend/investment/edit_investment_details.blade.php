@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                @foreach ($userInvestment as $investment)
                <form method="POST" action="{{ route('investment.edit.submit', $investment->id) }}">
                    @csrf
                    
                    <h3 class="box-header">Editar Investimento com Identificador {{ $investment->id }}</h3>
                    <div class="box-body">
                        <div class="form-group pb-10">
                            <h5>Categoria</h5>

                            <div class="controls">
                                <select name="category" id="categories" class="form-control">
                                    @foreach ($userCategories as $cat )
                                    <option value="{{ $cat->id }}" @if ($cat->id == $investment->catId)
                                        selected="selected"
                                        @endif
                                        >{{ $cat->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group pb-10">
                            <h5>Nome</h5>
                            <input type="text" name="name" class="form-control" placeholder="{{ $investment->name }}">
                        </div>
                        <div class="form-group pb-10">
                            <h5>Valor</h5>
                            <input type="text" name="amount" class="form-control"
                                placeholder="{{ $investment->amount }} €">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Data de Criação</h5>
                            <input type="date" name="startDate" class="form-control" value="{{ $investment->startDate }}">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Hora de Criação</h5>
                            <input type="time" name="startTime" class="form-control" value="{{ $investment->startTime }}">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Valor de Fecho</h5>
                            <input type="text" name="endAmount" class="form-control"
                                placeholder="{{ $investment->endAmount }} €">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Data de Fecho</h5>
                            <input type="date" name="endDate" class="form-control" value="{{ $investment->endDate }}">
                        </div>

                        <div class="form-group ">
                            <h5>Hora de Fecho</h5>
                            <input type="time" name="endTime" class="form-control" value="{{ $investment->endTime }}">
                        </div>

                        @endforeach
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
