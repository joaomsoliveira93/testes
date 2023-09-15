@extends('estilos.layout')

@section('style')

    <div class="row wrapper wrapper-content animated fadeInRight">
        <div class="col-lg-4">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Botões coloridos</h5>

                </div>
                <div class="ibox-content float-e-margins">

                    <p>
                        <button type="button" class="btn btn-w-m btn-default">Default</button>
                        <button type="button" class="btn btn-w-m btn-primary">Primary</button>
                        <button type="button" class="btn btn-w-m btn-success">Success</button>
                        <button type="button" class="btn btn-w-m btn-info">Info</button>
                        <button type="button" class="btn btn-w-m btn-warning">Warning</button>
                        <button type="button" class="btn btn-w-m btn-danger">Danger</button>
                        <button type="button" class="btn btn-w-m btn-link">Link</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Tamanhos</h5>

                </div>
                <div class="ibox-content float-e-margins">


                    <p>
                        <button type="button" class="btn btn-primary btn-lg">Large button</button>
                        <button type="button" class="btn btn-default btn-lg">Large button</button>
                        <br/>
                        <button type="button" class="btn btn-primary">Default button</button>
                        <button type="button" class="btn btn-default">Default button</button>
                        <br/>
                        <button type="button" class="btn btn-primary btn-sm">Small button</button>
                        <button type="button" class="btn btn-default btn-sm">Small button</button>
                        <br/>
                        <button type="button" class="btn btn-primary btn-xs">Mini button</button>
                        <button type="button" class="btn btn-default btn-xs">Mini button</button>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Botões Outline e Block</h5>

                </div>
                <div class="ibox-content float-e-margins">


                    <h3 class="font-bold">Outline</h3>
                    <p>
                        <button type="button" class="btn btn-outline btn-default">Default</button>
                        <button type="button" class="btn btn-outline btn-primary">Primary</button>
                        <button type="button" class="btn btn-outline btn-success">Success</button>
                        <button type="button" class="btn btn-outline btn-info">Info</button>
                        <button type="button" class="btn btn-outline btn-warning">Warning</button>
                        <button type="button" class="btn btn-outline btn-danger">Danger</button>
                        <button type="button" class="btn btn-outline btn-link">Link</button>
                    </p>
                    <h3 class="font-bold">Block</h3>
                    <p>
                        <button type="button" class="btn btn-block btn-outline btn-primary">Primary</button>
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Painéis </h5>
                    </div>
                    <div class="ibox-content">

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        Default Panel
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                        Primary Panel
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="panel panel-success">
                                    <div class="panel-heading">
                                        Success Panel
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                        <i class="fa fa-info-circle"></i> Info Panel
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="panel panel-warning">
                                    <div class="panel-heading">
                                        <i class="fa fa-warning"></i> Warning Panel
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="panel panel-danger">
                                    <div class="panel-heading">
                                        Danger Panel with Footer
                                    </div>
                                    <div class="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                    <div class="panel-footer">
                                        Panel Footer
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



@endsection
