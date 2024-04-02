<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LockersController;
use App\Http\Controllers\LockerRequestsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Support\Facades\Auth;

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
Auth::routes();
Route::get('/', function () {
    return redirect('/home');
});

Route::get('/logout', [AccountsController::class, 'logOut'])->name('user.logout');
Route::get('/register', [FormController::class,'index'])->name('makerequest');
Route::post('/registerttt', [FormController::class,'insertrequest'])->name('insertx');
Route::get('/home', [HomeController::class,'index'])->name('home');

Route::prefix('mylockers')->group(function(){
    Route::get('view', [LockersController::class, 'getMyLockers'])->name('mylockers.view');
    Route::get('{id}', [LockersController::class, 'getALocker'])->name('mylockerdetails');
});

Route::prefix('cabinetstatus')->group(function(){
    Route::get('view', [LockersController::class, 'getAllLockers'])->name('cabinetstatus');
    Route::get('{id}', [LockersController::class, 'getALocker'])->name('lockerdetails');
    Route::post('addcabinet', [LockersController::class, 'addCabinet'])->name('addcabinet');
    Route::match(['get','post'],'dropcabinet/{id}', [LockersController::class, 'dropCabinet'])->name('dropcabinet');
    Route::match(['get','post'],'dropgroupmember/{groupid}/{memberid}/{id}', [GroupsController::class, 'dropGroupMember'])->name('dropgroupmember');
    Route::post('addgroupmember/{groupid}/{id}', [GroupsController::class, 'addGroupMember'])->name('addgroupmember');
});

Route::prefix('releaselockers')->group(function(){
    Route::get('view', [LockersController::class, 'releaseLockers'])->name('releaselockers');
    Route::match(['get','post'],'release/{id}', [LockersController::class, 'releaseALocker'])->name('releaselocker');
    Route::match(['get','post'],'releasealllockers/{id}', [LockersController::class, 'releaseAllLockers'])->name('releasealllockers');
});

Route::prefix('locker-requests')->group(function(){
    Route::get('all', [LockerRequestsController::class, 'getRequests'])->name('locker-requests');
    Route::get('{id}', [LockerRequestsController::class, 'requestDetails'])->name('requestdetails');
    Route::get('confirmrequest/{id}', [LockerRequestsController::class, 'requestConfirm'])->name('requestconfirm');
    Route::get('updaterequest/{id}/{locker}/{state}', [LockerRequestsController::class, 'updateState'])->name('updaterequest');
    Route::get('confirmaccess/{id}/{group_id}/{locker}', [LockerRequestsController::class, 'confirmAccess'])->name('confirmaccess');
    Route::get('denyaccess/{id}/{group_id}', [LockerRequestsController::class, 'denyAccess'])->name('denyaccess');
});

Route::prefix('accounts')->group(function(){ 
    Route::get('/search',[AccountsController::class, 'searchAccounts'])->name('searchaccounts');
    Route::get('/all', [AccountsController::class, 'manageAccounts'])->name('manageaccounts');   
    Route::get('/{id}', [AccountsController::class, 'viewAccount'])->name('viewaccount');
    Route::post('/addaccount', [AccountsController::class, 'addAccount'])->name('addaccount');
    Route::post('/editaccount/{id}', [AccountsController::class, 'editAccount'])->name('editaccount');
    Route::get('/dropaccount/{id}', [AccountsController::class,'dropAccount'])->name('dropaccount');
    Route::get('/resetpassword/{id}',[AccountsController::class, 'resetPassword'])->name('resetpassword');
    Route::get('/resetpin/{id}',[AccountsController::class, 'resetPin'])->name('resetpin');
});

Route::get('forgotpassword',[ForgotPasswordController::class, 'forgotPassword'])->name('forgotpassword');
Route::post('forgotpasswordreset',[ForgotPasswordController::class, 'resetPassword'])->name('forgotpasswordreset');

Route::prefix('manager')->group(function(){ 
    Route::get('/search',[TeachersController::class, 'searchTeacher'])->name('searchmanagers');
    Route::get('/all', [TeachersController::class, 'manageTeachers'])->name('managemanagers');   
    Route::get('/{id}', [TeachersController::class, 'viewTeacher'])->name('viewmanager');
    Route::post('/addmanager', [TeachersController::class, 'addTeacher'])->name('addmanager');
    Route::post('/editmanager/{id}', [TeachersController::class, 'editTeacher'])->name('editmanager');
    Route::get('/dropmanager/{id}', [TeachersController::class,'dropTeacher'])->name('dropmanager');
});

Route::prefix('projects')->group(function(){ 
    Route::get('/search',[ProjectsController::class, 'searchProject'])->name('searchprojects');
    Route::get('/all', [ProjectsController::class, 'manageProjects'])->name('manageprojects');   
    Route::get('/{id}', [ProjectsController::class, 'viewProject'])->name('viewproject');
    Route::post('/addproject', [ProjectsController::class, 'addProject'])->name('addproject');
    Route::post('/editproject/{id}', [ProjectsController::class, 'editProject'])->name('editproject');
    Route::get('/dropproject/{id}', [ProjectsController::class,'dropProject'])->name('dropproject');
    Route::post('/addprojectteacher/{id}', [ProjectsController::class, 'addProjectTeacher'])->name('addprojectteacher');
    Route::match(['get','post'],'/dropprojectteacher/{id}/{teacherid}', [ProjectsController::class, 'dropProjectTeacher'])->name('dropprojectteacher');
});

Route::prefix('profile')->group(function(){
    Route::get('view', [AccountsController::class, 'viewProfile'])->name('profile');
    Route::post('edit',[AccountsController::class, 'editProfile'])->name('editprofile');
    Route::post('editpassword',[AccountsController::class, 'editPassword'])->name('editpassword');
    Route::post('editpin',[AccountsController::class, 'editPin'])->name('editpin');
});

Route::prefix('accesses')->group(function(){
    Route::get('/all', [LockersController::class, 'getAccesses'])->name('accesses.all');
    Route::get('/search',[LockersController::class, 'searchAccesses'])->name('searchaccesses');
});
