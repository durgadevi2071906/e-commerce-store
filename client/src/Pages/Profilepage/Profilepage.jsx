import React, {  useState } from 'react'
import './profile.css'
import Edit from '../../Assest/Image/edit.png'
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import ProfileModel from '../../Component/Profile/ProfileModel'

function Profilepage() {
    const { user } = useAuth()
    const [profileModel,setProfileModel] = useState(false);
    const [uploadImg,setUploadImg] = useState('');
    const [isloding,setIsloding] = useState(false);
    const [image,setImage] =useState('')
    const [errors,setErrors] = useState({});
    const [profile, setProfile] = useState(user);
    const [password_reset,setPassword_reset] = useState({current_password : '',new_password : '',confirm_password: ''});

    console.log('profile render')

    const handleChange = (event) => {
        setProfile((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }
    const profileSubmit = async(e) => {
        e.preventDefault();
        try {
            setIsloding(true)
            const res = await axios.post('http://localhost:8000/v1/user/profile/edit',{
                user_id : user.id,
                email: profile.email,
                name: profile.name,
                dob: profile.dob,
                number: profile.number,
                bio: profile.bio
            },{
            headers : {
                'Content-Type': 'application/json',
                'X-XSRF-Token' : Cookies.get('XSRF-TOKEN'),
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
            })
            const data = await res.data ;
            if(data.status){
                setErrors({});
                setIsloding(false);
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
            setIsloding(false);
            setErrors(error.response.data.errors);
        }
    }

    const ImageUpload = async(e) =>{
        setUploadImg(e.target.files[0]);
        setProfileModel(true);
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const handlePasswordChange = (e)=>{
        setPassword_reset((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const passwordResetSubmit =async (e)=>{
        e.preventDefault();
        try {
            setIsloding(true)
            const res = await axios.post('http://localhost:8000/v1/user/password-reset',password_reset,{
            headers : {
                'Content-Type': 'application/json',
                'X-XSRF-Token' : Cookies.get('XSRF-TOKEN'),
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
            })
            const data = await res.data ;
            if(data.status){
                setPassword_reset({current_password : '',new_password : '',confirm_password: ''})
                setErrors({});
                setIsloding(false);
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
            setIsloding(false);
            setErrors(error.response.data.errors);
        }
    }

    return (
        <section style={{ paddingTop: '90px' }} className='profile'>
            <div className="profile__container" style={{ alignItems: 'start' }}><h2>Profile</h2></div>
            <div className="profile__container">
                <h2>Persnol Information</h2>
                <div className="image">
                    <input onChange={ImageUpload} accept='image/*' type="file" id='avatar' hidden/>
                    <label htmlFor="avatar"><img className='pencil' src={Edit} alt='' /></label>
                    {user && user.avatar ? <img src={'https://api.gurhatech.online/public/user/'+user.avatar} alt="" /> : <img src='https://api.gurhatech.online/public/user/UIMG2025030167c34c22498ab.jpg' alt=''/>}
                </div>
                {profileModel && <div className='profile-wrapper'><ProfileModel setImage={setImage} uploadImg={uploadImg} setProfileModel={setProfileModel} avatar={user.avatar && user.avatar} image={image}/></div>}
                <form onSubmit={profileSubmit} className='form'>
                    <div className="form-control">
                        <label>Name</label><br />
                        <input  onChange={handleChange} type="text" name='name' value={profile.name} placeholder="Enter Your Name" />
                        {errors && <p style={{ color:'red' }}>{errors.name}</p>}
                    </div>
                    <div className="form-control">
                        <label>Email :</label><br />
                        <input  onChange={handleChange} disabled type="text" name='email' value={profile.email} placeholder='Enter Your Email' />
                        {errors && <p style={{ color:'red' }}>{errors.email}</p>}
                    </div>
                    <div className="form-control">
                        <label>DOB :</label><br />
                        <input  onChange={handleChange} type="date" name='dob' value={profile.dob} placeholder='' />
                        {errors && <p style={{ color:'red' }}>{errors.dob}</p>}
                    </div>
                    <div className="form-control">
                        <label>Mobile Number :</label><br />
                        <input  onChange={handleChange} type="text" name='number' value={profile.number} placeholder='Enter Mobile Number' />
                        {errors && <p style={{ color:'red' }}>{errors.number}</p>}
                    </div>
                    <div className="form-control">
                        <label>Bio :</label><br />
                        <input  onChange={handleChange} type="text" name='bio' value={profile.bio} placeholder='bio' />
                        {errors && <p style={{ color:'red' }}>{errors.bio}</p>}
                    </div>
                    <button type='submit' style={{ width: '150px', float: 'right' }}>Update Profile</button>
                </form>
            </div>
            <form onSubmit={passwordResetSubmit} className="profile__container">
                <h2 style={{ marginBottom: '30px' }}>Password Change</h2>
                <div className='form'>
                    <div className="form-control">
                        <label>Current Password :</label><br />
                        <input  onChange={handlePasswordChange} type="text" name='current_password' placeholder='Enter your Current Password' value={password_reset.current_password} />
                        {errors && <p style={{ color:'red' }}>{errors.current_password}</p>}
                    </div>
                    <div className="form-control">
                        <label>New Password :</label><br />
                        <input  onChange={handlePasswordChange} type="text" name='new_password' placeholder='Enter your New Password' value={password_reset.new_password} />
                        {errors && <p style={{ color:'red' }}>{errors.new_password}</p>}
                    </div>
                    <div className="form-control">
                        <label>Confirm Password :</label><br />
                        <input  onChange={handlePasswordChange} type="text" name='confirm_password' placeholder='Enter your Confirm Password' value={password_reset.confirm_password} />
                        {errors && <p style={{ color:'red' }}>{errors.confirm_password}</p>}
                    </div>
                    <button disabled={isloding} style={{ width: '150px', float: 'right' }}>{isloding ? 'loding..' : 'Saved Changes'}</button>
                </div>
            </form>
        </section>
    )
}

export default Profilepage
