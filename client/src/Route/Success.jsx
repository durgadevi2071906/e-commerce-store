import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
 

  return (
    <section className='hero' style={{ display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
      <div style={{ padding:'30px',borderRadius:'3px',border:'1px solid #999',display:'flex',gap:'20px',flexDirection:'column' }} className="box">
      <h1>Order Confirmed!!</h1>
        <div style={{ display:'flex',justifyContent:'space-between',gap:'20px' }}>
        <button style={{ background:'red',width:'fit-content',color:'#dddddd' }}><Link to='/user/checkout'>Go Back</Link></button>
        <button style={{ background:'green',width:'fit-content',color:'#dddddd' }}><Link to='/shop'>Go to Order</Link></button>
        </div>
      </div>
    </section>
  )
}

export default Success
