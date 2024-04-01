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
                <h3 class="box-title">Lista de Despesas</h3>
                <a href="{{ route('expense.add') }}" style="float:right" class="btn btn-rounded btn-primary mb-5">Adicionar Despesa</a>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                  <div class="table-responsive">
                    <table id="example1" class="table table-bordered table-striped">
                      <thead>
                          <tr>
                              <th width="5%">ID</th>
                              <th>Categoria</th>
                              <th>Despesa</th>
                              <th>Valor</th>
                              <th>Data</th>
                              <th>Hora</th>
                              <th width="35%">Ação</th>
                          </tr>
                      </thead>
                      <tbody>
                        @if(!Empty($data[0]))
                          @foreach ($data as $ex)
                          <tr>
                              <td>{{ $ex->id }}</td>
                              <td>{{ $ex->name }}</td>
                              <td>{{ $ex->Titulo }}</td>
                              <td class="text-danger">-{{ $ex->Montante }}€</td>
                              <td>{{ $ex->Data }}</td>
                              <td>{{ $ex->Hora }}</td>
                              <td>
                                <div class="row">
                                  <div class="pl-3">
                                    <a href="{{ route('expense.edit', $ex->id) }}" class="btn btn-info">Editar</a>
                                  </div>
                                  <div class="pl-3">
                                    <a href="{{ route('expense.view', $ex->id) }}" class="btn btn-primary">Detalhes</a>
                                  </div>
                                  <div class="pl-3">
                                    <a href="{{ route('expense.drop', $ex->id) }}" class="btn btn-danger" id="dropExpense">Remover</a>
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