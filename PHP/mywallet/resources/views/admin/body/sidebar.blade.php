@php
use App\Models\User;
$prefix = Request::route()->getPrefix();  
$route = Route::current()->getName();
echo $route;
$id = Auth::user()->id;
$editData = User::find($id);
@endphp

<aside class="main-sidebar">
    <!-- sidebar-->
    <section class="sidebar">	
		
      <div class="user-profile">
        <div class="ulogo">
          <a href="{{ route('dashboard') }}">
            <!-- logo for regular state and mobile devices -->
            <div class="d-flex align-itemcs-center justify-content-center">					 	
                <img src="{{ asset('backend/images/logo.png') }}" alt="">
                <h3><b>MyWallet</b> </h3>
            </div>
          </a>
        </div>
      </div>
      
      <!-- sidebar menu-->
      <ul class="sidebar-menu" data-widget="tree">  
		  
		    <li class="{{ ($route == 'dashboard')?'active':'' }} ">
          <a href="{{ route('dashboard') }}">
            <i class="fa fa-home" data-feather="home"></i>
			      <span>Página Inicial</span>
          </a>
        </li>  

        @if($editData->usertype === "Admin")
          <li class="treeview {{ ($prefix == '/users')?'active':'' }}">
            <a href="#">
              <i class="fa fa-cog" data-feather="users"></i>
              <span>Gerir Clientes</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-right pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="{{ route('user.view') }}"><i class="ti-more"></i>Ver Clientes</a></li>
              <li><a href="{{ route('user.add') }}"><i class="ti-more"></i>Adicionar Cliente</a></li>
            </ul>
          </li> 
        @endif
        
        <li class="treeview {{ ($prefix == '/profile')?'active':'' }}">
          <a href="#">
            <i  class="fa fa-user" data-feather="user"></i> <span>Perfil</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-right pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{ route('profile.view') }}"><i class="ti-more"></i>Perfil do Utilizador</a></li>
            <li><a href="{{ route('password.view') }}"><i class="ti-more"></i>Alterar Password</a></li>
          </ul>
        </li>

        <li class="{{ ($prefix == '/category')?'active':'' }}">
          <a href="{{ route('category.add') }}">
            <i  class="fa fa-bookmark"></i>
            <span>Adicionar Categoria</span>
          </a>
        </li>

        <li class="{{ ($prefix == '/investment')?'active':'' }}">
          <a href="{{ route('investment.list', $editData->id) }}">
            <i  class="fa fa-university"></i>
			      <span>Investimentos</span>
          </a>
        </li>  

        <li class="{{ ($prefix == '/revenue')?'active':'' }}">
          <a href="{{ route('revenue.list',$editData->id) }}">
            <i class="fa fa-credit-card-alt"></i>
			      <span>Receitas</span>
          </a>
        </li>  

        <li class="{{ ($prefix == '/expense')?'active':'' }}">
          <a href="{{ route('expense.list',$editData->id) }}">
            <i class="fa fa-car"></i>
			      <span>Despesas</span>
          </a>
        </li>
        
        <li class="{{ ($prefix == '/cryptos')?'active':'' }}">
          <a href="{{ route('cryptos.list',$editData->id) }}">
            <i class="fa fa-bitcoin"></i>
			      <span>Criptomoedas</span>
          </a>
        </li>  
        
        <li class="treeview {{ ($prefix == '/wallet')?'active':'' }}">
          <a href="#">
            <i class="fa fa-briefcase"></i> <span>Carteira</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-right pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="{{ route('cryptos.view', $editData->id) }}"><i class="ti-more"></i>Criptomoedas</a></li>
            <li><a href="{{ route('resultinvestment.view', $editData->id) }}"><i class="ti-more"></i>Investimentos</a></li>
            <li><a href="{{ route('result.view', $editData->id) }}"><i class="ti-more"></i>Total</a></li>
          </ul>
        </li>

      </ul>
    </section>
	
	
  </aside>