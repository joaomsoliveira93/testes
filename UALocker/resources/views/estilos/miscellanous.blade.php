@extends('estilos.layout')

@section('style')

    <div class="row">
        <div class="col-lg-4">
            <div class="ibox">
                <div class="ibox-content">
                    <h3>Lista de tarefas</h3>


                    <ul class="sortable-list connectList agile-list" id="todo">
                        <li class="warning-element" id="task1">
                            Simply dummy text of the printing and typesetting industry.
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Tag</a>
                                <i class="fa fa-clock-o"></i> 12.10.2015
                            </div>
                        </li>
                        <li class="success-element" id="task2">
                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Mark</a>
                                <i class="fa fa-clock-o"></i> 05.04.2015
                            </div>
                        </li>
                        <li class="info-element" id="task3">
                            Sometimes by accident, sometimes on purpose (injected humour and the like).
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Mark</a>
                                <i class="fa fa-clock-o"></i> 16.11.2015
                            </div>
                        </li>
                        <li class="danger-element" id="task4">
                            All the Lorem Ipsum generators
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-primary">Done</a>
                                <i class="fa fa-clock-o"></i> 06.10.2015
                            </div>
                        </li>
                        <li class="warning-element" id="task5">
                            Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Tag</a>
                                <i class="fa fa-clock-o"></i> 09.12.2015
                            </div>
                        </li>
                        <li class="warning-element" id="task6">
                            Packages and web page editors now use Lorem Ipsum as
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-primary">Done</a>
                                <i class="fa fa-clock-o"></i> 08.04.2015
                            </div>
                        </li>
                        <li class="success-element" id="task7">
                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Mark</a>
                                <i class="fa fa-clock-o"></i> 05.04.2015
                            </div>
                        </li>
                        <li class="info-element" id="task8">
                            Sometimes by accident, sometimes on purpose (injected humour and the like).
                            <div class="agile-detail">
                                <a href="#" class="float-right btn btn-xs btn-white">Mark</a>
                                <i class="fa fa-clock-o"></i> 16.11.2015
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    <div class="col-lg-2">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>Etiquetas</h5>

            </div>
            <div class="ibox-content">

                <p><span class="label">Plain</span></p>
                <p><span class="label label-primary">Primary</span></p>
                <p><span class="label label-info">Information</span></p>
                <p><span class="label label-success">Success</span></p>
                <p><span class="label label-warning">Warning</span></p>
                <p><span class="label label-danger">Danger</span></p>
            </div>
        </div>
    </div>



            <div class="col-lg-6">
                <div class="ibox ">
                    <div class="ibox-title">
                        <h5>Icons <small class="m-l-sm">de &nbsp<a target="_blank" href="http://fortawesome.github.io/Font-Awesome/icons/">Font Awesome</a> </small></h5>

                    </div>
                    <div class="ibox-content icons-box">

                        <div class="row">

                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-header" aria-hidden="true"></i> header</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-edit" aria-hidden="true"></i> edit</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-laptop" aria-hidden="true"></i> laptop</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-globe" aria-hidden="true"></i> globe</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-lock" aria-hidden="true"></i> lock</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-unlock" aria-hidden="true"></i> unlock</a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-question" aria-hidden="true"></i> question </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-users" aria-hidden="true"></i> users </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> fa-long-arrow-left </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-long-arrow-right" aria-hidden="true"></i> fa-long-arrow-right </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-save" aria-hidden="true"></i> fa-save </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-wrench" aria-hidden="true"></i> fa-wrench </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-check-square-o" aria-hidden="true"></i> fa-check-square-o </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-user" aria-hidden="true"></i> fa-user </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-warning" aria-hidden="true"></i> fa-warning </a></div>
                            <div class="infont col-md-3 col-sm-4"><a href="#"><i class="fa fa-trash-o" aria-hidden="true"></i> fa-trash-o </a></div>




                            <div class="clearfix"></div>
                        </div>











                    </div>
                </div>
            </div>
        </div>




@endsection
