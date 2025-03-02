import React from 'react'

const Coupon = ({coupon,couponInput,couponsubmit,setCouponInput,deletecoupon}) => {
  return (
    <>
     <input value={couponInput} onChange={(e)=> setCouponInput(e.target.value)} type="text" placeholder="Coupon Code"/>
     <button style={{ height:'100%' }} onClick={couponsubmit}>Add Coupon</button>
     {coupon && <div className="coupon_name">{coupon} &nbsp;&nbsp;&nbsp;<i onClick={deletecoupon} className='fa-solid fa-times'></i></div>}
    </>
  )
}

export default Coupon