@extends('admin.admin_master')
@section('admin')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
    
        <section class="content">

            <!-- Basic Forms -->
             <div class="box bg-gradient-primary-dark" >
               <div class="box-header with-border text-white">
                 <h4 class="box-title">Resultado</h4>
                 <h6 class="box-subtitle">Descubra o seu saldo financeiro</h6>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                 <div class="row">
                   <div class="col">
                    @csrf

            <section class="bg-gradient-success-dark text-white ">

              <!-- title row -->
              <div class="row">
                <div class="col-12">
                  <div class="page-header text-center">
                    <h2 class="d-inline"><span class="font-size-30">Receitas</span></h2>
                  </div>
                </div>
                <!-- /.col -->
              </div>
              <!-- info row -->

              <!-- /.box-header -->
              <div class="box-body">
                <div class="table-responsive ">
                  <table id="example1" class="table table-bordered table-striped text-white ">
                    <thead>
                        <tr>
                            <th style="width: 33%;">Categoria</th>
                            <th style="width: 33%;">Receita</th>
                            <th style="width: 33%;">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                          $totalRevenue = 0
                        @endphp
                        @foreach ($dataRevenue as $re)
                        <tr>
                            <td>{{ $re->name }}</td>
                            <td>{{ $re->Titulo }}</td>
                            <td>{{ $re->Montante }}€</td>
                            @php
                              $totalRevenue += $re->Montante
                            @endphp
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                    </tfoot>
                  </table>
                </div>
            </div>
            <!-- /.box-body -->
                          
                  <div class="row">
                    <div class="col-11 text-right">
                        <div class="total-payment">
                            <h3><b>Total :</b><div class="text-success">
                              {{ $totalRevenue }}€
                              </div></h3>
                        </div>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                    
            </section>
            <br>
            <section class="bg-gradient-warning-dark text-white ">

              <!-- title row -->
              <div class="row">
                <div class="col-12">
                  <div class="page-header text-center">
                    <h2 class="d-inline"><span class="font-size-30">Despesas</span></h2>
                  </div>
                </div>
                <!-- /.col -->
              </div>
              <!-- info row -->

              <!-- /.box-header -->
              <div class="box-body">
                <div class="table-responsive ">
                  <table id="example1" class="table table-bordered table-striped text-white ">
                    <thead>
                        <tr>
                            <th style="width: 33%;">Categoria</th>
                            <th style="width: 33%;">Despesa</th>
                            <th style="width: 33%;">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                          $totalExpense = 0
                        @endphp
                        @foreach ($dataExpense as $re)
                        <tr>
                            <td>{{ $re->name }}</td>
                            <td>{{ $re->Titulo }}</td>
                            <td>-{{ $re->Montante }}€</td>
                            @php
                              $totalExpense += $re->Montante
                            @endphp
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                    </tfoot>
                  </table>
                </div>
            </div>
            <!-- /.box-body -->
                          
                  <div class="row">
                    <div class="col-11 text-right">
                        <div class="total-payment">
                            <h3><b>Total :</b><div class="text-danger">
                              -{{ $totalExpense }}€
                              </div></h3>
                        </div>

                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
            </section>
            <br>
            @php
              $total = $totalRevenue - $totalExpense;
              if($total >= 0) {
                echo '<div class="col-12">
                        <div class="page-header text-center">
                          <h2 class="d-inline"><span class="font-size-30" name="total">Saldo : <div class="text-success">' . $total . '€</div></span></h2>
                        </div>
                      </div>';
              } else {
                echo '<div class="col-12">
                        <div class="page-header text-center">
                          <h2 class="d-inline"><span class="font-size-30" name="total">Saldo : <div class="text-danger">' . $total . '€</div></span></h2>
                        </div>
                      </div>';
              }
                
            @endphp   
                  
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
            </div>
            <!-- /.box-body -->
            </div>
            <!-- /.box -->
          </div>

           </section>
    
    </div>
</div>
@endsection