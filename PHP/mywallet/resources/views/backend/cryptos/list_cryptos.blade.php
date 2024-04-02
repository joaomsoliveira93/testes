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
                                <h3 class="box-title">Lista de Criptomoedas</h3>
                                <a href="{{ route('cryptos.add') }}" style="float:right"
                                    class="btn btn-rounded btn-primary mb-5">Adicionar CryptoMoeda</a>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Imagem</th>
                                                <th>Categoria</th>
                                                <th>Criptomoeda</th>
                                                <th>Valor</th>
                                                <th>Data Início</th>
                                                <th>Data Fecho</th>
                                                <th width="35%">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if (!empty($userCryptos[0]))
                                                @foreach ($userCryptos as $key => $cryptos)
                                                    <tr>
                                                        <td class="text-center"><i class="cc {{ $cryptos->Nome }}"
                                                                title="{{ $cryptos->Nome }}" style="font-size: 5em;"></i>
                                                        </td>
                                                        <td>{{ $cryptos->name }}</td>
                                                        <td>{{ $cryptos->Nome }}</td>
                                                        @php
                                                            if ($cryptos->Montante >= 0) {
                                                                echo '<td class="text-success">' . $cryptos->Montante . '€</td>';
                                                            } else {
                                                                echo '<td class="text-danger">' . $cryptos->Montante . '€</td>';
                                                            }
                                                        @endphp
                                                        <td>{{ $cryptos->DataOrdem }} {{ $cryptos->HoraOrdem }}</td>
                                                        <td>{{ $cryptos->DataFecho }} {{ $cryptos->HoraFecho }}</td>
                                                        <td>
                                                            <div class="row">
                                                                <div class="pl-3">
                                                                    <a href="{{ route('cryptos.edit', $cryptos->id) }}"
                                                                        class="btn btn-info">Editar</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('cryptos.remove', $cryptos->id) }}"
                                                                        class="btn btn-danger"
                                                                        id="deleteCryptos">Remover</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            @else
                                                <td colspan="8" class="m-auto text-center">Sem Informação</td>
                                            @endif
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
