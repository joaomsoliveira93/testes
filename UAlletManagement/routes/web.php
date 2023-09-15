<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\Backend\ProfileController;
use App\Http\Controllers\Backend\InvestmentController;
use App\Http\Controllers\Backend\ExpensesController;
use App\Http\Controllers\Backend\RevenueController;
use App\Http\Controllers\Backend\WalletController;
use App\Http\Controllers\Backend\CryptosController;
use Laravel\Jetstream\Rules\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('admin.index');
})->name('dashboard');

Route::get('/admin/logout', [AdminController::class, 'Logout'])->name('admin.logout');

// Investing management All Routes
Route::prefix('users')->group(function(){
    Route::get('view', [UserController::class, 'UserView'])->name('user.view');
    Route::get('add', [UserController::class, 'UserAdd'])->name('user.add');
    Route::get('edit/{id}', [UserController::class, 'UserEdit'])->name('user.edit');
    Route::get('delete/{id}', [UserController::class, 'UserDelete'])->name('user.delete');
    Route::post('store', [UserController::class, 'UserStore'])->name('user.store');
    Route::post('update/{id}', [UserController::class, 'UserUpdate'])->name('user.update');
});

Route::prefix('profile')->group(function(){
    Route::get('view', [ProfileController::class, 'ProfileView'])->name('profile.view');
    Route::get('edit', [ProfileController::class, 'ProfileEdit'])->name('profile.edit');
    Route::post('store', [ProfileController::class, 'ProfileStore'])->name('profile.store');
    Route::get('password/view', [ProfileController::class, 'PasswordView'])->name('password.view');
    Route::post('password/update', [ProfileController::class, 'PasswordUpdate'])->name('password.update');
    Route::get('drop', [ProfileController::class, 'DropAccount'])->name('profile.drop');
});

Route::prefix('category')->group(function(){
    Route::get('add', [ProfileController::class, 'AddCategoryView'])->name('category.add');
    Route::post('add',[ProfileController::class,'AddCategorySubmit'])->name('category.addSubmit');
    Route::get('edit/{id}', [ProfileController::class, 'EditCategoryView'])->name('category.edit');
    Route::post('edit/{id}',[ProfileController::class,'EditCategorySubmit'])->name('category.editSubmit');
    Route::get('drop/{id}',[ProfileController::class,'DropCategory'])->name('category.drop');
    Route::get('getdatainvcategory',[ProfileController::class,'GetDataGraphInvCategory'])->name('category.getdatainvcategory');
    Route::get('getdatadespcategory',[ProfileController::class,'GetDataGraphDespCategory'])->name('category.getdatadespcategory');
    Route::get('getdatarevenue',[ProfileController::class,'GetDataGraphRevenue'])->name('category.getdatarevenue');
});

Route::prefix('investment')->group(function(){
    Route::get('add', [InvestmentController::class, 'AddInvestmentView'])->name('investment.add');
    Route::post('add', [InvestmentController::class, 'AddInvestmentSubmit'])->name('investment.add.submit');
    Route::get('edit/{id}', [InvestmentController::class, 'EditInvestmentView'])->name('investment.edit');
    Route::post('edit/{id}', [InvestmentController::class, 'EditInvestmentSubmit'])->name('investment.edit.submit');
    Route::get('delete/{id}', [InvestmentController::class, 'RemoveInvestment'])->name('investment.remove');
    Route::get('list/{id}', [InvestmentController::class, 'ListInvestmentView'])->name('investment.list');
    Route::get('view/{id}', [InvestmentController::class, 'ViewInvestment'])->name('investment.view');
    Route::get('getdatainvest', [InvestmentController::class, 'GetDataGraphInvest'])->name('investment.getdatainvest');
    Route::get('close/{id}', [InvestmentController::class, 'CloseInvestment'])->name('investment.close');
    Route::post('close/{id}', [InvestmentController::class, 'CloseInvestmentSubmit'])->name('investment.close.submit');
    Route::get('getdatainvestall', [InvestmentController::class, 'GetDataGraphInvestIniTerm'])->name('investment.getdatainvestall');
});

Route::prefix('expense')->group(function(){
    Route::get('add', [ExpensesController::class, 'AddExpenseView'])->name('expense.add');
    Route::post('add', [ExpensesController::class, 'AddExpenseSubmit'])->name('expense.addSubmit');
    Route::get('edit/{id}', [ExpensesController::class, 'EditExpenseView'])->name('expense.edit');
    Route::post('edit/{id}', [ExpensesController::class, 'EditExpenseSubmit'])->name('expense.editSubmit');
    Route::get('list', [ExpensesController::class, 'ListExpenseView'])->name('expense.list');
    Route::get('view/{id}', [ExpensesController::class, 'ViewExpense'])->name('expense.view');
    Route::get('drop/{id}',[ExpensesController::class,'DropExpense'])->name('expense.drop');
    Route::get('getdataexpense',[ExpensesController::class,'GetDataGraphExpense'])->name('expense.getdataexpense');
});

Route::prefix('revenue')->group(function(){
    Route::get('add', [RevenueController::class, 'AddRevenueView'])->name('revenue.add');
    Route::post('add', [RevenueController::class, 'AddRevenueSubmit'])->name('revenue.addSubmit');
    Route::get('edit/{id}', [RevenueController::class, 'EditRevenueView'])->name('revenue.edit');
    Route::post('edit/{id}', [RevenueController::class, 'EditRevenueSubmit'])->name('revenue.editSubmit');
    Route::get('list/{id}', [RevenueController::class, 'ListRevenueView'])->name('revenue.list');
    Route::get('view/{id}', [RevenueController::class, 'ViewRevenue'])->name('revenue.view');
    Route::get('drop/{id}',[RevenueController::class,'DropRevenue'])->name('revenue.drop');
});

Route::prefix('cryptos')->group(function(){
    Route::get('add', [CryptosController::class, 'AddCryptosView'])->name('cryptos.add');
    Route::post('add', [CryptosController::class, 'AddCryptosSubmit'])->name('cryptos.add.submit');
    Route::get('edit/{id}', [CryptosController::class, 'EditCryptosView'])->name('cryptos.edit');
    Route::post('edit/{id}', [CryptosController::class, 'EditCryptosSubmit'])->name('cryptos.edit.submit');
    Route::get('delete/{id}', [CryptosController::class, 'RemoveCryptos'])->name('cryptos.remove');
    Route::get('list/{id}', [CryptosController::class, 'ListCryptosView'])->name('cryptos.list');
    //Route::get('view/{id}', [CryptosController::class, 'ViewCryptos'])->name('cryptos.view');
    //Route::get('getdatainvest', [InvestmentController::class, 'GetDataGraphInvest'])->name('investment.getdatainvest');
});

Route::prefix('wallet')->group(function(){
    Route::get('cryptos/{id}', [WalletController::class, 'CryptosView'])->name('cryptos.view');
    Route::get('result/{id}', [WalletController::class, 'ResultView'])->name('result.view');
    Route::get('result/investment/{id}', [WalletController::class, 'InvestmentResultView'])->name('resultinvestment.view');
});