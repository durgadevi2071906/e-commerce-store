import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

function ProfileModel({setImage,uploadImg,setProfileModel,avatar,image}) {
    const updateprofile = async(e)=>{
         const formData = new FormData();
        formData.append('file', uploadImg);
        try {
            const res = await axios.post('http://localhost:8000/v1/user/profile/upload',formData,{
            headers : {
                'Content-Type': 'multipart/form-data',
                'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
            })
            const data = await res.data ;
            if(data.status){
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
                    window.location.href = '/user/profile';
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
