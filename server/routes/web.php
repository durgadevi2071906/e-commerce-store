<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StripeController;


Route::get('/',function(){ return response()->json(['message' => 'Unauthorized User'],401); });
Route::get('order/success',[StripeController::class,'success']);