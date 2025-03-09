<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function UserOrder($user_id = null){
        $UserOrder = Order::where('user_id',$user_id)->orderBy('created_at','DESC')->get();
        return response()->json(['status' => 'true','order' => $UserOrder],200);
    }

    public function AllOrder(){
        return response()->json(['data' => Order::all()],200);
    }
}
