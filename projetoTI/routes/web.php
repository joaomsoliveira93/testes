<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\LinkedinController;
use App\Http\Controllers\TwitterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\StudiesController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\RegisterController;



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

Route::get('/',  [HomeController::class, 'index']);
Route::get('/home', [HomeController::class, 'index'])->name('home');

Auth::routes();

/**Facebook routes */
Route::get('facebook/redirect', [FacebookController::class, 'handleFacebookRedirect'])->name('facebook.redirect');
Route::get('facebook/callback', [FacebookController::class, 'handleFacebookcallback'])->name('facebook.callback');

/**LinkedIn routes */
Route::get('linkedin/redirect', [LinkedinController::class, 'handleLinkedinRedirect'])->name('linkedin.redirect');
Route::get('linkedin/callback', [LinkedinController::class, 'handleLinkedincallback'])->name('linkedin.callback');

/**Twitter routes */
Route::get('twitter/redirect', [TwitterController::class, 'handletwitterRedirect'])->name('twitter.redirect');
Route::get('twitter/callback', [TwitterController::class, 'handletwittercallback'])->name('twitter.callback');

Route::post('register/registaccount', [RegisterController::class, 'register'])->name('register.account');
Route::get('confirmemail/{id}',[RegisterController::class,'confirmEmail'])->name('email.confirm');
Route::post('resetpasswordemail',[ForgotPasswordController::class,'sendEmail'])->name('resetpassword.email');
Route::get('resetpassword/{id}',[ForgotPasswordController::class,'resetPage'])->name('user.resetpassword.page');
Route::post('resetpassword',[ForgotPasswordController::class,'resetPassword'])->name('user.resetpassword');

Route::prefix('posts')->group(function () {
    Route::get('search', [PostsController::class, 'searchPosts'])->name('posts.search');
    Route::get('allposts', [PostsController::class, 'allPosts'])->name('posts.all');
    Route::get('postdetails/{id}', [PostsController::class, 'PostDetails'])->name('post.view');
    Route::post('addcategory', [PostsController::class, 'addCategory'])->name('post.category.add');
});

Route::prefix('studies')->group(function () {
    Route::get('allstudies', [StudiesController::class, 'allStudies'])->name('studies.all');
    Route::get('search', [StudiesController::class, 'searchStudies'])->name('studies.search');
    Route::get('studydetails/{id}', [StudiesController::class, 'studyDetails'])->name('study.view');
    Route::get('studydetails/{id}/find', [StudiesController::class, 'studyDetailsPost'])->name('study.post.search');
    Route::match(['get','post'],'enterstudy/{id}/{local}', [StudiesController::class, 'enterStudy'])->name('study.enter');
    Route::match(['get','post'],'exitstudy/{id}/{local}', [StudiesController::class, 'exitStudy'])->name('study.exit');
});

Route::prefix('profile')->group(function () {
    Route::get('view', [AccountsController::class, 'profile'])->name('profile.view');
    Route::match(['get','post'],'linkedin/delete/{id}', [LinkedinController::class, 'removeAccount'])->name('linkedin.drop');
    Route::match(['get','post'],'facebook/delete/{id}', [FacebookController::class, 'removeAccount'])->name('facebook.drop');
    Route::post('update', [AccountsController::class, 'profileUpdate'])->name('profile.update');
    Route::post('changepassword', [AccountsController::class, 'changePassword'])->name('password.update');
});

Route::prefix('manageusers')->group(function () {
    Route::get('view', [AccountsController::class, 'allAccounts'])->name('accounts.view');
    Route::get('search', [AccountsController::class, 'searchAccounts'])->name('accounts.search');
    Route::get('userdetails/{id}', [AccountsController::class, 'accountDetails'])->name('user.view');
    Route::post('add', [AccountsController::class, 'addAccount'])->name('account.add');
    Route::post('edit', [AccountsController::class, 'editAccount'])->name('account.edit');
    Route::match(['get','post'],'passordreset/{id}', [AccountsController::class, 'resetPassword'])->name('account.password.reset');
    Route::match(['get','post'],'drop/{id}', [AccountsController::class, 'dropAccount'])->name('account.drop');
    
});

Route::prefix('managestudies')->group(function () {
    Route::get('view', [StudiesController::class, 'manageStudies'])->name('studies.manage');
    Route::get('search', [StudiesController::class, 'manageStudiesSearch'])->name('studies.manage.search');
    Route::post('add', [StudiesController::class, 'addStudy'])->name('study.add');
    Route::get('studydetails/{id}', [StudiesController::class, 'manageStudy'])->name('study.manage');
    Route::get('studydetails/{id}/find', [StudiesController::class, 'manageStudyPost'])->name('manage.study.search');
    Route::post('edit', [StudiesController::class, 'editStudy'])->name('study.edit');
    Route::match(['get','post'],'drop/{id}', [StudiesController::class, 'dropStudy'])->name('study.drop');
    Route::post('addcategory', [StudiesController::class, 'addStudyCategory'])->name('study.category.add');
    Route::match(['get','post'],'drop/{study_id}/{category_id}', [StudiesController::class, 'dropStudyCategory'])->name('study.category.drop');
    Route::post('category/new', [StudiesController::class, 'newCategory'])->name('category.new');
    Route::post('addPosts',[StudiesController::class,'addPosts'])->name('study.addPosts');
});

Route::prefix('manageposts')->group(function () {
    Route::get('view', [PostsController::class, 'managePosts'])->name('posts.manage');
    Route::get('search', [PostsController::class, 'searchManagePosts'])->name('posts.manage.search');
    Route::post('add', [PostsController::class, 'addPost'])->name('post.add');
    Route::get('postdetails/{id}', [PostsController::class, 'managePost'])->name('post.manage');
    Route::post('edit', [PostsController::class, 'editPost'])->name('post.edit');
    Route::match(['get','post'],'drop/{id}', [PostsController::class, 'dropPost'])->name('post.drop');
    Route::post('addstudy', [PostsController::class, 'addStudy'])->name('post.study.add');
    Route::match(['get','post'],'dropstudy/{id}', [PostsController::class, 'dropStudy'])->name('post.study.drop');
    Route::match(['get','post'],'dropcategory/{id}', [PostsController::class, 'dropCategory'])->name('post.category.drop');
});
