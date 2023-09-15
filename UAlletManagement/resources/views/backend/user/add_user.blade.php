@extends('admin.admin_master')
@section('admin')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
    
        <section class="content">

            <!-- Basic Forms -->
             <div class="box">
               <div class="box-header with-border">
                 <h4 class="box-title">Adicionar Utilizador</h4>
                 <h6 class="box-subtitle">Preencha todos os campos necessários para proceder com o registo do utilizador</h6>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                 <div class="row">
                   <div class="col">
                       <form method="POST" action="{{ route('user.store') }}">
                        @csrf
                         <div class="row">
                           <div class="col-12">
                            <div class="row">
                                <div class="col-md-6">
                                 <div class="form-group">
                                     <h5>Tipo de Utilizador<span class="text-danger">*</span></h5>
                                     <div class="controls">
                                         <select name="usertype" id="usertype" required="" class="form-control">
                                             <option value="">Selecione o tipo de utilizador</option>
                                             <option value="Admin">Administrador</option>
                                             <option value="User">Utilizador</option> 
                                         </select>
                                    </div>
                                 </div>
                                </div> <!-- End Col Md-6 --> 
                                <div class="col-md-6">
                                     <div class="form-group">
                                         <h5>Nome<span class="text-danger">*</span></h5>
                                         <div class="controls">
                                             <input type="text" name="name" class="form-control" required=""></div>
                                     </div>
                                 </div> <!-- End Col Md-6 -->
                            </div> <!-- End Row -->

                               <div class="row">
                                   <div class="col-md-6">
                                        <div class="form-group">
                                            <h5>Email<span class="text-danger">*</span></h5>
                                            <div class="controls">
                                                <input type="email" name="email" class="form-control" required=""></div>
                                        </div>
                                   </div> <!-- End Col Md-6 --> 
                                   <div class="col-md-6">
                                        <div class="form-group">
                                            <h5>Password<span class="text-danger">*</span></h5>
                                            <div class="controls">
                                                <input type="password" name="password" class="form-control" required="" aria-invalid="false"></div>
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