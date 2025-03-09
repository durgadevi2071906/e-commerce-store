import React from 'react'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
    <section className='hero' style={{ display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
          <div style={{ padding:'30px',borderRadius:'3px',border:'1px solid #999',display:'flex',gap:'20px',flexDirection:'column' }} className="box">
          <h1>Order Cancel?</h1>
            <div>
            <button style={{ background:'red',width:'fit-content',color:'#dddddd' }}><Link to='/user/checkout'>Go Back</Link></button>
            </div>
          </div>
        </section>
  )
}

export default Cancel
