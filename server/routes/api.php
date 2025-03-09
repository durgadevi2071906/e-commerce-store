<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\StripeController;
use Illuminate\Support\Facades\Route;


Route::post('/signup',[AuthController::class, 'signup']);
Route::post('/signin',[AuthController::class, 'signin']);

Route::middleware(['api','CustomSanctumAuth'])->group(function(){
    Route::get('/',function(){ return response()->json(['message' => 'Unauthorized User']); });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/user',[AuthController::class,'user']);
    Route::post('/user/profile/edit',[AuthController::class,'editprofile']);
    // User Password
    Route::post('/user/password-reset',[PasswordController::class,'UserResetPassword']);
    Route::post('/user/profile/upload',[PasswordController::class,'ProfileUpload']);
    // Stripe Route
    Route::post('/session',[StripeController::class,'session']);
    Route::get('/payment/{charge_id?}',[StripeController::class,'getCharge']);
    Route::get('/cancel',[StripeController::class,'cancel']);
    Route::get('/{user_id}/order',[OrderController::class,'UserOrder']);
    Route::get('/order',[OrderController::class,'AllOrder']);
});