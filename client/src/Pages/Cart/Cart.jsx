import React, { useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { useCarts } from '../../Context/Carts';
import { toast } from 'react-toastify';

function Cart() {
    const [count, setCount] = useState(1);
    const {carts,setCarts} = useCarts();

    const CartDelete = (product_id, user_id) => {
        const result = carts.filter(cart => cart.product_id !== product_id && cart.user_id === user_id)
        setCarts(result);
        toast.success('Cart remove succesfully.', {
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

    return (
        <>
            <section style={{ paddingTop: '90px' }} ><ol>Home / <span>Cart</span></ol></section>
            <section className="cart">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '200px' }}>Product</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quanity</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts && carts.map(cart => (
                                <tr key={cart.product_id}>
                                    <td style={{ width: '200px' }}>{cart.name}</td>
                                    <td>${cart.price}</td>
                                    <td>{cart.size}</td>
                                    <td>{cart.color}</td>
                                    <td>
                                        <div className="quanity">
                                            <button onClick={() => setCount(count >= 2 ? count - 1 : 1)}>-</button>
                                            <div className="count">{cart.quanity}</div>
                                            <button onClick={() => setCount(count <= 9 ? count + 1 : 1)} className="active">+</button>
                                        </div>
                                    </td>
                                    <td style={{ maxHeight: '60px' }}><Link to={`/product/${cart.product_id}`}><img style={{ maxWidth: '50px', maxHeight: '100%' }} src={cart.image} alt="" /></Link></td>
                                    <td onClick={() => CartDelete(cart.product_id, cart.user_id)} style={{ cursor: 'pointer', color: 'red' }}><i className='fa-solid fa-trash'></i></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
            <section className='flex-between' >
                <Link to="/shop" className="btn"><button>Return To Shop</button></Link>
                <Link to="/product/cart" className="btn"><button>Update Cart</button></Link>
            </section>
            <hr />
            <section className='cart'>
                <div className="main">
                    <div className="col checkout-box" >
                        <p className="heading">Cart Total</p>
                        <div className="box box-border flex-between">
                            <p>Subtotal:</p>
                            <p className="price">${count * 199}</p>
                        </div>
                        <div className="box box-border flex-between">
                            <p>Shipping:</p>
                            <p>Free</p>
                        </div>
                        <div className="box box-border flex-between">
                            <p>GST 12%:</p>
                            <p>${count * 199 * 12 / 100}</p>
                        </div>
                        <div className="box flex-between">
                            <p>Total Amount:</p>
                            <p className="price">${count * 199 + count * 199 * 12 / 100}</p>
                        </div>
                        <div className="box"><Link style={{ margin: '0' }} to="/product/checkout"><button>Process To Checkout</button></Link></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
