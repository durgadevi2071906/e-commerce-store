/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect,  useState } from 'react'
import './checkout.css'
import PaymentImg from '../../Assest/Image/pay-icon.png'
// import IMG from '../../Assest/Image/image 57.png'
import Coupon from '../../Component/Coupon'

function Checkout() {
    const [coupon,setCoupon] = useState('');
    const [couponInput,setCouponInput] = useState('');
    const [input,setInput] = useState({
        name : '',
        company_name : '',
        email : '',
        street : '',
        phone_number : '',
        city : '',
        apartment : '',
        payment_type : '',
        saved_address : '',
    });
    const handaleRadioChange =(e) =>{
        setInput(prev => ({...prev,payment_type :e.target.value }));
    }
    const handaleChange = (e)=>{
        setInput(prev => ({...prev,[e.target.name] : e.target.value}));
    }
    const couponsubmit = (e)=>{
        e.preventDefault();
        setCoupon(couponInput);
    }
    const deletecoupon = ()=>{
        setCoupon('')
        setCouponInput('')
    }

    useEffect(()=>{
        setInput(prev => ({...prev,payment_type :'bank' }));
    },[])
    
    const [checkout,setCheckout] = useState({});
    useEffect(()=>{
       const storedata = localStorage.getItem('checkout');
       if(storedata){
        setCheckout(JSON.parse(storedata))
       }
    },[])
    // Order Place ======================
    const OrderPlace = (e) =>{
        e.preventDefault();
        console.log(input);
    }
    const OrderPlaceEnter = (e) =>{
        if(e.key === "Enter"){
            console.log(input);
        }
    }

    useEffect(()=>{
        window.addEventListener('keydown',OrderPlaceEnter)
        return () =>{
            window.removeEventListener('keydown',OrderPlaceEnter);
        }
    },[])
    
  return (
    <>
    <section style={{ paddingTop:'90px' }}><ol>Account / Product / <span>Checkout</span></ol></section>
    <section className="checkout">
        <form onSubmit={OrderPlace} className="checkout__container">     
            <div className="col-left">
                <h1 className="h1">Address Details</h1>
                <div className='form'>
                    <div className="input-box">
                        <label>Your Name:</label><br/>
                        <input onChange={handaleChange} value={input.name} name='name' type="text" placeholder="Enter Your Name"/>
                    </div>
                    <div className="input-box">
                        <label>Company Name:</label><br/>
                        <input onChange={handaleChange} value={input.company_name} name='company_name' type="text" placeholder="Company Name"/>
                    </div>
                    <div className="input-box">
                        <label>Street Address:</label><br/>
                        <input onChange={handaleChange} value={input.street} name='street' type="text" placeholder="Street Address"/>
                    </div>
                    <div className="input-box">
                        <label>Apartment, floor, etc. (optional):</label><br/>
                        <input onChange={handaleChange} value={input.apartment} name='apartment' type="text" placeholder="" />
                    </div>
                    <div className="input-box">
                        <label>Town/City:</label><br/>
                        <input onChange={handaleChange} value={input.city} name='city' type="text" placeholder="Town/City" />
                    </div>
                    <div className="input-box">
                        <label>Phone Number:</label><br/>
                        <input onChange={handaleChange} value={input.phone_number} name='phone_number' type="text" placeholder="Phone Number"/>
                    </div>
                    <div className="input-box">
                        <label>Email Address*:</label><br/>
                        <input onChange={handaleChange} value={input.email} name='email' type="text" placeholder="Email Address*" />
                    </div>
                    <div className="flex">
                        <input onChange={(e) => setInput(prev => ({...prev,saved_address :e.target.value}))} checked={input.saved_address.includes('true')}
                        name='saved_address' value={input.saved_address !== "" ? "" : "true"} type="checkbox"/>
                        <span>Save this information for faster check-out next time</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="col-right">
                <h1 className="h1">Product Details</h1>
                <div className="row">
                    <div className="box">
                        <img className="product-image" src={checkout && checkout.image} alt=""/>
                        <p>{checkout && checkout.name}</p>
                    </div>
                    <div style={{ borderBottom:'1px solid #222',paddingBottom:'20px' }} className="box">
                        <p>Subtotal:</p>
                        <p className="price">${checkout && checkout.price}</p>
                    </div>
                    <div style={{ borderBottom:'1px solid #222',paddingBottom:'20px' }} className="box">
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className="box">
                        <p>Total:</p>
                        <p className="price">${checkout && checkout.price}</p>
                    </div>
                    <div className="box bg">
                        <Coupon coupon={coupon} couponInput={couponInput} couponsubmit={couponsubmit} setCouponInput={setCouponInput} deletecoupon={deletecoupon}/>
                    </div>
                    <div className="box">
                        <div className="col flex">
                            <input onChange={handaleRadioChange} name='type' value='bank' id='payment' checked={input.payment_type === 'bank'} type="radio" /><label htmlFor="payment" >Bank</label >
                        </div>
                        <img className="payment-img" src={PaymentImg} alt=""/>
                    </div>
                    <div className="box">
                        <div className="col flex">
                            <input onChange={handaleRadioChange} name='type' value='cash' id='cash' checked={input.payment_type === 'cash'} type="radio" /><label htmlFor="cash">Cash on delivery</label >
                        </div>
                    </div>
                    <div className="box">
                        <button type='submit'>Order Place</button>
                    </div>
                </div>
            </div>
        </form>
    </section>
    </>
  )
}

export default Checkout
