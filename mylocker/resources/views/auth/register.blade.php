@extends('layouts.app')

@section('content')

<section>
    <div class="container">

        <div class="row">

            <div class="col-md-8 offset-md-2">
                <div class="text-center">

                    <h1 class="logo-name">My <span class="fa fa-lock"></span> </h1>
                    <h3>Realiza o teu pedido de cacifo</h3>
                </div>

                <div class="card">

                    <div class="card-header text-white bg-green">                       
                            
                            <h5 id="titleregisto">Pedido de cacifo</h5>  
                    </div>
                    <div class="card-body">

                        <form class="contact-form" method="post" action="{{ route('insertx') }}">
                            @csrf
                            <div class="form-section">
                                <select class="form-control m-b" name="projetox">
                                    @foreach ($projetos as $projeto)
                                    <option value={{ $projeto->id }}>{{ $projeto->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-section">
                                <table class="footable table table-stripped toggle-arrow-tiny default breakpoint footable-loaded" data-page-size="15" id="tabela" name="">
                                    <thead>
                                        <tr>
                                            <th data-hide="phone" class="footable-visible footable-sortable">Nºmec<span class="footable-sort-indicator"></span></th>
                                            <th data-hide="phone" class="footable-visible footable-sortable">Nome<span class="footable-sort-indicator"></span></th>
                                            <th data-hide="phone" class="footable-visible footable-sortable">E-mail<span class="footable-sort-indicator"></span></th>
                                            <th class="text-right footable-visible footable-last-column" data-sort-ignore="true">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="footable-even">
                                            <td class="footable-visible">
                                                <input type="text" name="mec[]" class="form-control" required>
                                            </td>
                                            <td class="footable-visible">
                                                <input type="text" name="name[]" class="form-control" required>
                                            </td>
                                            <td class="footable-visible">
                                                <input type="email" name="email[]" class="form-control" required>
                                            </td>
                                            <td class="footable-visible">
                                                <a class="btn btn-xs btn-outline btn-danger Eliminar">Eliminar</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>
                                                <a class="btn btn-xs btn-outline btn-secondary" style="color:white!important" id="Adicionar"> <span class="fa fa-plus"></span>Adicionar</a>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="form-navigation">
                                <hr>
                                <a href="{{route('home')}}"class=" btn  btn-secondary float-left home" id="cancelRequest"><span class="fa fa-arrow-left"></span> Cancelar Pedido</a>
                                <a class="previous btn  btn-secondary float-left" style="color:white!important"><span class="fa fa-arrow-left"></span> Anterior</a>
                                <a class="next btn  btn-secondary float-right" style="color:white!important"> Seguinte <span class="fa fa-arrow-right"></span></a>
                                <button type="submit" class="btn  btn-secondary float-right" style="color:white!important" id="submit"> <span class="fa fa-check"></span>Submeter</button>
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>            
        </div>
    </div>
</section>



@endsection