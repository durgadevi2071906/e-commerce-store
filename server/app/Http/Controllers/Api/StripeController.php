<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
    public function charge(Request $request, $tok_visa = null)
    {
        $validata = Validator::make($request->all(), [
            'price' => 'required',
        ]);
        if ($validata->fails()) {
            return response()->json(['status' => 0, 'message' => 'Validate error', 'errors' => $validata->errors()], 400);
        }

        $stripe = new \Stripe\StripeClient(config('stripe.sk'));

        try {

            // $customer = $stripe->customers->create([
            //     'name' => 'Pushpendra',
            //     'email' => 'pushpendra@example.com',
            //     'phone' => '1234567890',
            //   ]);

            $charge = $stripe->charges->create([
                'amount' => $request->price * 100,
                'currency' => 'inr',
                'source' => $tok_visa,
            ]);
            if ($charge) {
                return response()->json(['status' => 1, 'message' => 'Payment recevied', 'redirectUrl' => 'https://api.gurhatech.online/success/' . $charge->id], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 0, 'message' => 'Payment Field', 'redirectUrl' => 'https://api.gurhatech.online/cancel'], 400);
        }
    }


    public function session(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $name = $request->get('name');
        $price = $request->get('price');
        $quanity = $request->get('quanity');
        $user_id = $request->get('user_id');
        $image = $request->get('images');
        // try {
            $session = \Stripe\Checkout\Session::create([
                'line_items'  => [
                    [
                        'price_data' => [
                            'currency'     => 'USD',
                            'product_data' => [
                                "name" => $name,
                                'description' => 'Payment by Gurhastore',
                                // 'images' => $image,
                            ],
                            'unit_amount'  => $price * 100,
                        ],
                        'quantity'   => $quanity,
                    ],
                ],
                'mode'        => 'payment',
                // 'success_url' => "https://api.gurhatech.online/success",
                // 'cancel_url'  => "https://api.gurhatech.online/cancel",
                'success_url' => "http://localhost:8000/order/success"."?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => "http://localhost:3000/order/cancel",
            ]);

            if ($session) {

                $order = Order::create([
                    'order_id' => $session->id,
                    'user_id' => $user_id,
                    'name' => $name,
                    'price' => $price,
                    'image' => $image,
                    'quanity' => $quanity
                ]);
                if ($order) {
                    return response()->json(['status' => 1, 'session' => $session], 200);
                }
            }
        // } catch (\Throwable $th) {
        //     return response()->json(['status' => 0, 'message' => 'connection field'], 400);
        // }
    }

    public function success(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $session_id = $request->get('session_id');
        try {
            $session = \Stripe\Checkout\Session::retrieve($session_id);
            if (!$session) {
                throw new NotFoundHttpException();
            }
        } catch (\Throwable $th) {
            throw new NotFoundHttpException();
        }

        // $customer = \Stripe\Customer::retrieve($session->customer);
        $order = Order::where('order_id', $session_id)->where('payment_status', 'unpaid')->first();
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $order->payment_status = 'paid';
        $order->save();

        return redirect('http://localhost:3000/user/order');
    }

    public function getCharge($charge_id = null)
    {
        $stripe = new \Stripe\StripeClient(config('stripe.sk'));

        try {
            $charge = $stripe->charges->retrieve($charge_id, []);
            if ($charge) {
                return response()->json(['status' => 1, 'message' => 'Payment recevied', 'data' => $charge], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 0, 'message' => 'Invailide payment id'], 400);
        }
    }
}

// $stripe = new \Stripe\StripeClient(config('stripe.sk'));
