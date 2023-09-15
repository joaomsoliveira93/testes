@extends('layouts.admin_master')
@section('admin')

    <div class="wrapper  ">
        <div class="row">
            <div class="col-md-6 animated fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-lock"></i> Estado dos Armários</p>
                            <div>
                                Verificar o estado e do acessos dos cacifos.
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('cabinetstatus') }}" class="btn btn-xs btn-outline btn-primary">Ir para
                                    <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 animated2 fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-unlock"></i> Libertar Cacifos</p>
                            <div>
                                Verificar os estado dos cacifos e liberbar um ou mais.
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('releaselockers') }}" class="btn btn-xs btn-outline btn-primary">Ir para
                                    <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="row">
            <div class="col-md-6 animated fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-question"></i> Requisições de Cacifos</p>
                            <div>
                                Verificar os pedidos de acesso aos cacifos para os projetos dos alunos.
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('locker-requests') }}" class="btn btn-xs btn-outline btn-primary">Ir
                                    para<i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 animated2 fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-users"></i> Gerir contas</p>
                            <div>
                                Gerir as contas de utilizadores que têm acesso à plataforma.
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('manageaccounts') }}" class="btn btn-xs btn-outline btn-primary">Ir para
                                    <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 animated fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-retweet"></i> Gerir Acessos</p>
                            <div>
                                Verificar quem abriu e fechou o cacifo
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('accesses.all') }}" class="btn btn-xs btn-outline btn-primary">Ir
                                    para<i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 animated2 fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">
                        <div class="product-desc">

                            <p class="product-name"><i class="fa fa-address-card"></i> Gerir docentes</p>
                            <div>
                                Gerir os Docentes da unidades curriculares
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{ route('manageteachers') }}" class="btn btn-xs btn-outline btn-primary">Ir para
                                    <i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 animated fadeInRightBig">
                <div class="ibox ">
                    <div class="ibox-content product-box">                            
                        <div class="product-desc">
                            
                            <p class="product-name"><i class="fa fa-folder-open"></i> Gerir Projetos</p>
                            <div >
                                Criar projetos temáticos e associar a docentes
                            </div>
                            <div class="m-t text-righ">
                                <a href="{{route('manageprojects')}}" class="btn btn-xs btn-outline btn-primary">Ir para<i class="fa fa-long-arrow-right"></i> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
        </div>




    </div>

@endsection
