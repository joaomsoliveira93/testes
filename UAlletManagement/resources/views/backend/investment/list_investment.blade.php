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
                                <h3 class="box-title">Lista de Investimentos</h3>
                                <a href="{{ route('investment.add') }}" style="float:right"
                                    class="btn btn-rounded btn-primary mb-5">Adicionar Investimento</a>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th width="5%">ID</th>
                                                <th>Categoria</th>
                                                <th>Investimento</th>
                                                <th>Valor</th>
                                                <th>Data Início</th>
                                                <th>Data Fecho</th>
                                                <th>Valor de Fecho</th>
                                                <th width="35%">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if (!empty($userInvestments[0]))
                                                @foreach ($userInvestments as $key => $investment)

                                                    <tr>
                                                        <td>{{ $investment->id }}</td>
                                                        <td>{{ $investment->name }}</td>
                                                        <td>{{ $investment->Nome }}</td>
                                                        @php
                                                            if ($investment->Montante >= 0) {
                                                                echo '<td class="text-success">' . $investment->Montante . '€</td>';
                                                            } else {
                                                                echo '<td class="text-danger">' . $investment->Montante . '€</td>';
                                                            }
                                                        @endphp
                                                        <td>{{ $investment->DataOrdem }} {{ $investment->HoraOrdem }}
                                                        </td>
                                                        <td>{{ $investment->DataFecho }} {{ $investment->HoraFecho }}
                                                        </td>
                                                        @php
                                                            if ($investment->MontanteFinal >= 0) {
                                                                echo '<td class="text-success">' . $investment->MontanteFinal . '€</td>';
                                                            } else {
                                                                echo '<td class="text-danger">' . $investment->MontanteFinal . '€</td>';
                                                            }
                                                        @endphp
                                                        <td>
                                                            <div class="row">
                                                                <div class="pl-3">
                                                                    <a href="{{ route('investment.edit', $investment->id) }}"
                                                                        class="btn btn-info">Editar</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('investment.view', $investment->id) }}"
                                                                        class="btn btn-primary">Detalhes</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('investment.remove', $investment->id) }}"
                                                                        class="btn btn-danger"
                                                                        id="deleteInvestment">Remover</a>
                                                                </div>
                                                                @if ($investment->MontanteFinal == null)
                                                                    <div class="pl-3">
                                                                        <a href="{{ route('investment.close', $investment->id) }}"
                                                                            class="btn btn-success"
                                                                            id="closeInvestment">Fechar</a>
                                                                    </div>
                                                                @endif
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
