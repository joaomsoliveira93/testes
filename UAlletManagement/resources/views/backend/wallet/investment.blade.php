@extends('admin.admin_master')
@section('admin')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
    
        <section class="content">

            <!-- Basic Forms -->
             <div class="box bg-gradient-info-dark" >
               <div class="box-header with-border text-white">
                 <h4 class="box-title">Investimentos</h4>
                 <h6 class="box-subtitle">Resumo do valor investido</h6>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                 <div class="row">
                   <div class="col">
                    @csrf

            <section class="text-white ">

              <!-- title row -->
              <div class="row">
                <div class="col-12">
                  <div class="page-header text-center">
                    <h2 class="d-inline"><span class="font-size-30">Investimentos</span></h2>
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
                            <th style="width: 25%;">Categoria</th>
                            <th style="width: 25%;">Investimento</th>
                            <th style="width: 25%;">Valor</th>
                            <th style="width: 25%;">Valor de Fecho</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                          $totalInvestment = 0
                        @endphp
                        @foreach ($dataInvestment as $re)
                        <tr>
                            <td>{{ $re->name }}</td>
                            <td>{{ $re->Nome }}</td>
                            @php
                                if($re->Montante >= 0) {
                                    echo '<td class="text-success">' . $re->Montante . '€</td>';
                                } else {
                                    echo '<td class="text-danger">' . $re->Montante . '€</td>';
                                }
                                if($re->MontanteFinal >= 0) {
                                    echo '<td class="text-success">' . $re->MontanteFinal . '€</td>';
                                } else {
                                    echo '<td class="text-danger">' . $re->MontanteFinal . '€</td>';
                                }
                            @endphp


                            @php
                              $totalInvestment += $re->Montante
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
                            <h3>
                               @php
                                if($totalInvestment >= 0) {
                                  echo '<div class="col-12">
                                          <div class="page-header text-center">
                                            <h2 class="d-inline"><span class="font-size-30" name="total">Total <div class="text-success">' . $totalInvestment . '€</div></span></h2>
                                          </div>
                                        </div>';
                                } else {
                                  echo '<div class="col-12">
                                          <div class="page-header text-center">
                                            <h2 class="d-inline"><span class="font-size-30" name="total">Total <div class="text-danger">' . $totalInvestment . '€</div></span></h2>
                                          </div>
                                        </div>';
                                }
                                  
                              @endphp
                            </h3>
                        </div>
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                    
            </section>
            <br>
                  
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