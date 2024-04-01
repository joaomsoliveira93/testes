@extends('admin.admin_master')
@section('admin')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <div class="container-full">

            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-12">

                        <div class="box box-widget widget-user">
                            <!-- Add the bg color to the header using any of the bg-* classes -->
                            <div class="widget-user-header bg-black">
                                <h3 class="widget-user-username">{{ $user->name }}</h3>
                                <a href="{{ route('profile.edit') }}" style="float:right" class="btn btn-rounded btn-primary mb-5">Editar Perfil</a>
                                @if($user->id != "1")
                                    <a href="{{ route('profile.drop') }}" style="float:right" class="btn btn-rounded btn-primary mb-5 mr-5 btn-danger" id="dropProfile">Eliminar Conta</a>
                                @endif
                                <h6 class="widget-user-desc">Email - {{ $user->email }}</h6>
                            </div>
                            <div class="widget-user-image">
                                <img class="rounded-circle"
                                    src="{{ !empty($user->image) ? url('upload/user_images/' . $user->image) : url('upload/no_image.jpg') }}"
                                    alt="User Avatar">
                            </div>
                            <div class="box-footer">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="description-block">
                                            <h5 class="description-header">Número de Telemóvel</h5>
                                            <span class="description-text">{{ $user->mobile }}</span>
                                        </div>
                                        <!-- /.description-block -->
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-sm-6">
                                        <div class="description-block">
                                            <h5 class="description-header">Endereço</h5>
                                            <span class="description-text">{{ $user->address }}</span>
                                        </div>
                                        <!-- /.description-block -->
                                    </div>
                                    <!-- /.col -->
                                    
                                    <!-- /.col -->
                                </div>
                                <!-- /.row -->
                            </div>
                        </div>

                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
            </section>
            <!-- /.content -->

            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-12">

                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Lista de Categorias</h3>
                                <a href="{{ route('category.add') }}" style="float:right"
                                    class="btn btn-rounded btn-primary mb-5">Adicionar Categoria</a>
                            </div>
                            
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="table-responsive">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th width="5%">ID</th>
                                                <th>Nome da Categoria</th>
                                                <th width="35%">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if (!empty($data[0]))
                                                @foreach ($data as $cat)
                                                    <tr>
                                                        <td>{{ $cat->id }}</td>
                                                        <td>{{ $cat->name }}</td>
                                                        <td>
                                                            <div class="row">
                                                                <div class="pl-3">
                                                                    <a href="{{ route('category.edit', $cat->id) }}"
                                                                        class="btn btn-info">Editar</a>
                                                                </div>
                                                                <div class="pl-3">
                                                                    <a href="{{ route('category.drop', $cat->id) }}"
                                                                        class="btn btn-danger" id="dropCat">Remover</a>
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



    </div>
    </div>

@endsection
