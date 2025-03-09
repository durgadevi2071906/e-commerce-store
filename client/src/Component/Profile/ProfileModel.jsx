import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import useAuthStore from '../../Context/AuthStore';

function ProfileModel({profile,setImage,uploadImg,setProfileModel,avatar,image}) {
    const {Token,updateToken} = useAuthStore();

    const updateprofile = async()=>{
         const formData = new FormData();
        formData.append('file', uploadImg);
        try {
            const res = await axios.post('https://api.gurhatech.online/v1/user/profile/upload',formData,{
            headers : {
                'Content-Type': 'multipart/form-data',
                'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
                'Authorization': `Bearer ${Token.token}`
            }
            })
            const data = await res.data ;
            if(data.status){
                updateToken({
                    name : Token.user.name,
                    email : Token.user.email,
                    avatar : data.name,
                    email_verified_at:null,
                    dob : Token.user.dob,
                    number : Token.user.number,
                    bio : Token.user.bio,
                    created_at : Token.user.created_at,
                    updated_at : new Date(),
                });
                setProfileModel(false)
                setImage('')
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="profile-model">
        <div className="imag">{image ? <img src={image} alt="" /> : <img src={avatar && avatar} alt="" />}</div>
        <div className='btn'><button onClick={()=>setProfileModel(false)}>Back</button><button onClick={updateprofile}>Upload</button></div>
    </div>
  )
}

export default ProfileModel
