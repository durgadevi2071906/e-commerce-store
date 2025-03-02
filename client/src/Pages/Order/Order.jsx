import React from 'react'
import './order.css'

function Order() {
  return (
    <>
    <section className="cart hero">
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Quanity</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Shoes</td>
                    <td>$199</td>
                    <td>Large</td>
                    <td>White</td>
                    <td>1</td>
                    <td style={{ maxHeight:'60px' }}><img style={{ maxWidth:'50px',maxHeight:'100%' }} src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></td>
                    <td style={{ cursor:'pointer',color:'red' }}><i className='fa-solid fa-trash'></i></td>
                </tr>
                <tr>
                    <td>Shoes</td>
                    <td>$199</td>
                    <td>Large</td>
                    <td>White</td>
                    <td>1</td>
                    <td style={{ maxHeight:'60px' }}><img style={{ maxWidth:'50px',maxHeight:'100%' }} src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></td>
                    <td style={{ cursor:'pointer',color:'red' }}><i className='fa-solid fa-trash'></i></td>
                </tr>
                <tr>
                    <td>Shoes</td>
                    <td>$199</td>
                    <td>Large</td>
                    <td>White</td>
                    <td>1</td>
                    <td style={{ maxHeight:'60px' }}><img style={{ maxWidth:'50px',maxHeight:'100%' }} src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></td>
                    <td style={{ cursor:'pointer',color:'red' }}><i className='fa-solid fa-trash'></i></td>
                </tr>
            </tbody>
        </table>
    </section>
    </>
  )
}

export default Order
