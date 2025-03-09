<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function user()
    {
        return response()->json(['status' => true, 'user' => Auth::user()], 200);
    }
    public function signup(Request $request)
    {
        $validateUser = Validator::make(
            $request->only('email', 'name', 'password', 'password_confirmation'),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:4|max:50',
                'password_confirmation' => 'required'
            ]
        );

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors(),
            ], 400);
        }

        $saved = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($saved) {
           $user =  Auth::attempt(['email' => $request->email, 'password' => $request->password]);
            if($user){
                return response()->json([
                    'status' => true,
                    'token' => $saved->createToken('API Token')->plainTextToken,
                    'token_type' => 'bearer',
                    'message' => 'You are registered successfully.',
                    'user' => Auth::user(),
                ], 200);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Something want wrong! Please try again.',
            ], 400);
        }
    }

    public function signin(Request $request)
    {
        $validateUser = Validator::make(
            $request->only('email', 'password'),
            [
                'email' => 'required|email|exists:users,email',
                'password' => 'required|min:4',
            ],
            [
                'email.required' => 'Your email address is required.',
                'email.email' => 'Please provide a valid email address.',
                'password.required' => 'Password is field required.',
                'password.min' => 'Password must be at least 4 characters.',
            ]
        );
        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors(),
            ], 400);
        }
        $user = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
        if ($user) {
            return response()->json([
                'status' => true,
                'message' => 'You are logged in successfully.',
                'token' => $request->user()->createToken('API Token')->plainTextToken,
                'token_type' => 'bearer',
                'user' => Auth::user(),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Password does not match Please enter correct password.',
                'errors' => ["password" => 'Password does not match Please enter correct password.']
            ], 400);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            Auth::logout();
            return response()->json([
                'status' => true,
                'message' => 'You are logged out successfully.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json('Unauthorized' . $th);
        }
    }

    // Update User Profile
    public function editprofile(Request $request)
    {
        $validateprofile = Validator::make(
            $request->only('name', 'email'),
            [
                'name' => 'required',
                'email' => 'required|email'
            ]
        );
        if ($validateprofile->fails()) {
            return response()->json(['status' => 'false', 'message' => 'Validation error', 'errors' => $validateprofile->errors(),],400);
        }
        $user = User::where('id',Auth::id())->update([
            'name' => $request->name,
            'dob' => $request->dob,
            'number' => $request->number,
            'bio' => $request->bio
        ]);
        if($user){
            return response()->json([
                'status' => true,
                'message' => 'Profile has been updated succesfully.',
            ], 200);
        }
    }
}
