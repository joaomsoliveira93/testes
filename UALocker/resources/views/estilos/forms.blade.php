@extends('estilos.layout')

@section('style')

    <div class="row">
        <div class="col-lg-7">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Formulário Básico </h5>

                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-6 b-r"><h3 class="m-t-none m-b">Sign in</h3>
                            <p>Sign in today for more expirience.</p>
                            <form role="form">
                                <div class="form-group"><label>Email</label> <input type="email" placeholder="Enter email" class="form-control"></div>
                                <div class="form-group"><label>Password</label> <input type="password" placeholder="Password" class="form-control"></div>
                                <div>
                                    <button class="btn btn-sm btn-primary float-right m-t-n-xs" type="submit"><strong>Log in</strong></button>
                                    <label> <input type="checkbox" class="i-checks"> Remember me </label>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-6"><h4>Not a member?</h4>
                            <p>You can create an account:</p>
                            <p class="text-center">
                                <a href="#"><i class="fa fa-sign-in big-icon"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-5">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Formulário Horizontal</h5>

                </div>
                <div class="ibox-content">
                    <form>
                        <p>Sign in today for more expirience.</p>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Email</label>

                            <div class="col-lg-10"><input type="email" placeholder="Email" class="form-control"> <span class="form-text m-b-none">Example block-level help text here.</span>
                            </div>
                        </div>
                        <div class="form-group row"><label class="col-lg-2 col-form-label">Password</label>

                            <div class="col-lg-10"><input type="password" placeholder="Password" class="form-control"></div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-offset-2 col-lg-10">
                                <div class="i-checks"><label> <input type="checkbox"> Remember me </label></div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-offset-2 col-lg-10">
                                <button class="btn btn-sm btn-white" type="submit">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-8">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Formulário Inline</h5>

                </div>
                <div class="ibox-content">
                    <form role="form" class="form-inline">
                        <div class="form-group">
                            <label for="exampleInputEmail2" class="sr-only">Email address</label>
                            <input type="email" placeholder="Enter email" id="exampleInputEmail2"
                                   class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword2" class="sr-only">Password</label>
                            <input type="password" placeholder="Password" id="exampleInputPassword2"
                                   class="form-control">
                        </div>
                        <div class="form-check abc-checkbox form-check-inline m-l-md">
                            <input class="form-check-input" type="checkbox"  value="option1">
                            <label class="form-check-label"> Remember me </label>
                        </div>
                        <button class="btn btn-white" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>Formulário Modal </h5>

                </div>
                <div class="ibox-content">
                    <div class="text-center">
                        <a data-toggle="modal" class="btn btn-primary" href="#modal-form">Formulário Modal</a>
                    </div>
                    <div id="modal-form" class="modal fade" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-sm-6 b-r"><h3 class="m-t-none m-b">Sign in</h3>

                                            <p>Sign in today for more expirience.</p>

                                            <form role="form">
                                                <div class="form-group"><label>Email</label> <input type="email" placeholder="Enter email" class="form-control"></div>
                                                <div class="form-group"><label>Password</label> <input type="password" placeholder="Password" class="form-control"></div>
                                                <div>
                                                    <button class="btn btn-sm btn-primary float-right m-t-n-xs" type="submit"><strong>Log in</strong></button>
                                                    <label> <input type="checkbox" class="i-checks"> Remember me </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-sm-6"><h4>Not a member?</h4>
                                            <p>You can create an account:</p>
                                            <p class="text-center">
                                                <a href="#"><i class="fa fa-sign-in big-icon"></i></a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
