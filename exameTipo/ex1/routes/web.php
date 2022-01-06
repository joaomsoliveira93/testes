<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\clienteController;

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

Route::get('/', [clienteController::class, 'getAll'])->name('clientes.all');
Route::get('/Cliente/{id}', [clienteController::class, 'getCliente'])->name('cliente.view');
Route::get('/Cliente/Editar/{id}', [clienteController::class, 'editCliente'])->name('cliente.edit');
Route::post('/Cliente/EditarSubmit/{id}', [clienteController::class, 'editClienteSubmit'])->name('cliente.edit.submit');
Route::match(['get','post'],'/Cliente/Drop/{id}', [clienteController::class, 'dropClienteSubmit'])->name('cliente.drop.submit');
Route::get('/Cliente/Adidionar', function() {return view('addCliente');})->name('cliente.add');
Route::post('/Cliente/AdicionarSubmit', [clienteController::class, 'addClienteSubmit'])->name('cliente.add.submit');