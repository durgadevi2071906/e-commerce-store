<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller
{
    public function UserResetPassword(Request $request)
    {
        $user = Auth::user();
        $validatePassword = Validator::make(   
            $request->only('current_password','new_password','confirm_password'),
           [
            'current_password' => [
                'required',
                'min:4',
                function($attribute,$value,$fail) use ($user){
                    if(!Hash::check($value,$user->password)){
                        return $fail(__('Your current password does not match our record.'));
                    }
                }
            ],
            'new_password' => 'required|min:4',
            'confirm_password' => 'same:new_password'
           ]
        );
        if ($validatePassword->fails()) {
            return response()->json(['status' => 'false', 'message' => 'Validation error', 'errors' => $validatePassword->errors()],400);
        }
        $user = User::where('id',Auth::id())->update(['password' => Hash::make($request->new_password)]);
            if($user){
                return response()->json([
                    'status' => 'true',
                    'message' => 'Password has been updated succesfully.'
                ],200);
            }
    }

    public function ProfileUpload(Request $request){
        $path = 'user/';
        if (!File::exists(public_path($path))) {
             File::makeDirectory(public_path($path),0777,true);
        }
        $file = $request->file('file');
        $new_image_name = 'UIMG'.date('Ymd').uniqid().'.jpg';
        $user = Auth::user();
        $old_image = $user->avatar ;
        if(File::exists(public_path($path.$old_image))){
          @unlink($path.$old_image);
        }
        $avatar = User::where('id',Auth::id())->update(['avatar' => $new_image_name]);
        $upload = $file->move(public_path($path), $new_image_name);
        if($upload && $avatar){
            return response()->json(['status'=>1, 'message'=>'Profile picture chnged successfully.','name' => $new_image_name],200);
        }else{
              return response()->json(['status'=>0, 'message'=>'Something went wrong, try again later'],400);
        }
    }
}
