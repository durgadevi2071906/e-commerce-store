import React, { useEffect, useState } from 'react'
import './order.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'
import useAuthStore from '../../Context/AuthStore';


function Order() {
  const {Token} = useAuthStore();
    const [order,setOrder] = useState([]);
    const APIURL = `https://api.gurhatech.online/v1/${Token.user && Token.user.id}/order` ;

    const getOrder = async(APIURL)=>{
        try {
            const res = await axios.get(APIURL, {
              headers: {
                'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
                'Authorization': `Bearer ${Token.token}`,
              }
            });
            const data = res.data;
            if (data.status) {
                setOrder(data.order);
            }
          } catch (error) {
             console.log(error)
          }
    }

    useEffect(()=>{
        getOrder(APIURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[APIURL])
  return (
    <>
    <section className="cart">
        <div className="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quanity</th>
                    <th>Image</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
               {
                order && order.map((item,i) => (
                    <tr key={i}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    {/* <td>Large</td> */}
                    <td>{item.quanity}</td>
                    <td style={{ maxHeight: '60px' }}><Link to={`/product/${item.order_id}`}><img style={{ maxWidth: '50px', maxHeight: '100%' }} src={item.image} alt="" /></Link></td>
                    <td style={{ color : item.payment_status === 'paid' ? 'green' : 'red' } }>{item.payment_status}</td>
                </tr>
                ))
               }
            </tbody>
        </table>
        </div>
    </section>
    </>
  )
}

export default Order
