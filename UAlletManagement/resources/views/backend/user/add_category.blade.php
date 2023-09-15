@extends('admin.admin_master')
@section('admin')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
    
        <section class="content">

            <!-- Basic Forms -->
             <div class="box">
               <div class="box-header with-border">
                 <h4 class="box-title">Adicionar Categoria</h4>
                 <h6 class="box-subtitle">Introduza o nome da Categoria que pretende adicionar</h6>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                 <div class="row">
                   <div class="col">
                       <form method="POST" action="{{ route('category.addSubmit') }}">
                        @csrf
                         <div class="row">
                           <div class="col-12">
                            <div class="row">
                                <div class="col-md-6">
                                     <div class="form-group">
                                         <h5>Categoria</h5>
                                         <div class="controls">
                                             <input type="text" name="name" class="form-control" required="">
                                             </div>

                                     </div>
                                 </div> <!-- End Col Md-6 -->
                            </div> <!-- End Row -->
                              <div class="row">
                              <div class="col-md-6">
                                  <div class="text-xs-right">
                                      <br>
                                      <input type="submit" class="btn btn-rounded btn-info mb-5" value="Adicionar">
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