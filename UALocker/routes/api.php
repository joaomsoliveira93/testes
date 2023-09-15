<?php

use App\Http\Controllers\Api\ApiAccessController;
use App\Models\Locker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/opens/{id}/{locker_id}', [ApiAccessController::class, 'apiAccess'])->name('apiaccess');


Route::get('/test', function(){
    return Locker::all();
});