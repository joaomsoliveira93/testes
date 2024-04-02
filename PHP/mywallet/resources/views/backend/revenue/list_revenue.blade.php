@extends('admin.admin_master')
@section('admin')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <div class="container-full">

            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-12">

                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Lista de Receitas</h3>
                                <a href="{{ route('revenue.add') }}" style="float:right"
                                    class="btn btn-rounded btn-primary mb-5">Adicionar Receita</a>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th width="5%">ID</th>
                                                <th>Categoria</th>
                                                <th>Receita</th>
                                                <th>Valor</th>
                                                <th>Data</th>
                                                <th>Hora</th>
                                                <th width="35%">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if (!empty($data[0]))
                                                @foreach ($data as $re)
                                                    <tr>
                                                        <td>{{ $re->id }}</td>
                                                        <td>{{ $re->name }}</td>
                                                        <td>{{ $re->Titulo }}</td>
                                                        <td class="text-success">{{ $re->Montante }}€</td>
                                                        <td>{{ $re->Data }}</td>
                                                        <td>{{ $re->Hora }}</td>
                                                        <td>
                                                            <div class="row">
                                                                <div class="pl-3">
                                                                    <a href="{{ route('revenue.edit', $re->id) }}"
                                                                        class="btn btn-info">Editar</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('revenue.view', $re->id) }}"
                                                                        class="btn btn-primary">Detalhes</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('revenue.drop', $re->id) }}"
                                                                        class="btn btn-danger" id="dropRevenue">Remover</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            @else
                                                <td colspan="8" class="m-auto text-center">Sem Informação</td>
                                            @endif
                                </div>

                                </tbody>
                                <tfoot>
                                </tfoot>
                                </table>
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
        </div>
        <!-- /.row -->
        </section>
        <!-- /.content -->

    </div>
    </div>

@endsection
