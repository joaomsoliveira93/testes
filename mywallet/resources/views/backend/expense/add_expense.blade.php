@extends('admin.admin_master')
@section('admin')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
    
        <section class="content">

            <!-- Basic Forms -->
             <div class="box">
               <div class="box-header with-border">
                 <h4 class="box-title">Adicionar Despesa</h4>
                 <a href="{{ route('category.add') }}" style="float:right" class="btn btn-rounded btn-primary mb-5">Adicionar Categoria</a>
                 <h6 class="box-subtitle">Preencha todos os campos necessários para proceder com o registo da despesa</h6>
               </div>
               <!-- /.box-header -->
               <div class="box-body">
                 <div class="row">
                   <div class="col">
                       <form method="POST" action="{{ route('expense.addSubmit') }}">
                        @csrf
                         <div class="row">
                           <div class="col-12">
                            <div class="row">
                                <div class="col-md-6">
                                 <div class="form-group">
                                     <h5>Categoria<span class="text-danger">*</span></h5>
                                     <div class="controls">
                                         <select name="categoria" id="categoria" required="" class="form-control">
                                            <option value="">Selecione a Categoria da Despesa</option>
                                            @foreach ($categorias as $cat )
                                                <option  value="{{ $cat->id }}">{{ $cat->name }}</option>
                                            @endforeach
                                         </select>
                                    </div>
                                 </div>
                                </div> <!-- End Col Md-6 --> 

                            </div> <!-- End Row -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <h5>Despesa<span class="text-danger">*</span></h5>
                                    <div class="controls">
                                        <input type="text" name="name" class="form-control" required=""></div>
                                </div>
                            </div> <!-- End Col Md-6 -->
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group validate">
                                    <h5>Valor <span class="text-danger">*</span></h5>
                                    <div class="input-group"> <span class="input-group-addon">€</span>
                                        <input type="number" step=".01" name="onlyNum" class="form-control" required="" data-validation-required-message="Este campo é necessário!" aria-invalid="false"> </div>
                                </div>
                            </div>
                        </div> <!-- End Row -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <h5>Data <span class="text-danger">*</span></h5>
                                    <div class="controls">
                                        <input type="date" name="date" class="form-control" required="" data-validation-required-message="This field is required" aria-invalid="false"> <div class="help-block"></div></div>
    
                                </div>
                            </div> <!-- End Col Md-6 -->
                        </div> <!-- End Row -->
                        
                        <div class="row">
                            <div class="col-md-6">
                                <h5>Hora <span class="text-danger">*</span></h5>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <input class="form-control" type="time" name="time" required="">
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