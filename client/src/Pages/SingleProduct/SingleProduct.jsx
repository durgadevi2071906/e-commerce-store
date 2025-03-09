/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import './products.css';
import { toast } from 'react-toastify';
import {Ratting,Review,Description} from '../../Component/ActiveTab';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Slider from '../../Component/Slider';
import ReletiveProduct from '../../Component/ReletiveProduct';
import PreLoader from '../../Component/Preloader/PreLoader';
import { useCarts } from '../../Context/Carts';
import useAuthStore from '../../Context/AuthStore';


function SingleProduct() {
  const navigate = useNavigate();
  const {Token} = useAuthStore();
  const imageElement = useRef();
  const [count,setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [isloading ,setIsloading] = useState(false);
  let { id } = useParams();
  const [color,setColor] = useState('')
  const [size,setSize] = useState('')

  const {carts,setCarts} = useCarts();
  const [checkout,setCheckout] = useState({name :'',image:'',price:'',quanity:''});
  let check = carts.filter(item => item.product_id === product.id);

  useEffect(()=>{
    localStorage.setItem('carts',JSON.stringify(carts));
  },[id]);

  const AddtoCart = (e)=>{
    e.preventDefault();
    if(Token){
      if(check.length < 1){
        setCarts([...carts , {
          user_id : Token.user.id ? Token.user.id : '',
          product_id : product.id ? product.id : '',
          image : product.thumbnail ? product.thumbnail : '',
          price : product.price ? product.price : '',
          name : product.title ? product.title : '',
          quanity : count,
          color : color,
          size : size,
        }]);
        localStorage.setItem('carts',JSON.stringify(carts));
        toast.success('Product added to cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }else{ 
        toast.error('Product already in cart.', {
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
    }else{
      toast.info('You are login first.',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/login')
    }
    
    
  }

  const BuyNow = (e)=>{
    e.preventDefault();
    if(Token){
      localStorage.setItem('checkout',JSON.stringify(checkout));
      setCheckout({name:product.title,image:product.thumbnail,price:product.price,quanity:count});
      navigate('/user/checkout');
    }else{
      toast.info('You are login first.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      navigate('/login')
    }
  }
  useEffect(()=>{
    localStorage.setItem('checkout',JSON.stringify(checkout));
  },[checkout])

  const API = `https://dummyjson.com/products/category/${product.category}`
  //Start Fetch Product Data
  const getSingleProduct = async (productId) => {
    try {
      setIsloading(true);
      let API_URL = `https://dummyjson.com/products/${productId}`
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setIsloading(false);
        }, 100);
        setProduct(data);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }
  //End Fetch Product Data
  const handleChangeColor = (e)=>{
    setColor(e.target.value)
  }
  const handleChangeSize = (e)=>{
    setSize(e.target.value)
  }
  useEffect(()=>{
    setColor('white')
    setSize('L')
  },[])

  useEffect(() => {
    getSingleProduct(id)   
  }, [id]);
  const [productImage,setProductImage] = useState([]);
  useEffect(()=>{
    setProductImage(product.images)
  },[product.images])
  // Update Image
  const handleImage = (img)=>{
    imageElement.current.src = img ;
  }

  // tab handle 
  const [activeTab,setActivetab] = useState('description')
  const handleTab = (tab) =>{
    setActivetab(tab)
  }
  return (
   <>
   { isloading ? <section style={{ display:'flex',alignItems:'center',justifyContent:"center" }} className='product hero'><PreLoader/></section> : 
    <section style={{ paddingTop:'80px' }} className='products'>
    <div className="col-left flex">
      { window.innerWidth <= 600 ? <Slider images={productImage} image={product.thumbnail}/> : 
      <div className="images">
        {productImage.map((img,i) => (
          <div key={i} onClick={ () => handleImage(img)} className="box flex-center"><img src={img} alt="" /></div>
        ))}
        <div onClick={ () => handleImage(product.thumbnail)} className="box flex-center"><img src={product.thumbnail} alt="" /></div>
      </div>
      }
    </div>
    <div className="col-middle">
      <div className="image"><img ref={imageElement} src={product.thumbnail} alt="" /></div>
    </div>
    <div className="col-right">
      <div className="products-detail">
        <h1>{product.title}</h1>
        <div className="ratting">
          <div className="stars-outer" >
            <div className="stars-inner" style={{ width: `${(product.rating/5)*100}%` }}></div>
          </div>
          <span>( {product.stock} Reviews ) </span>
          <span>| </span>
          <span style={{ color:'green' }}>{product.availabilityStatus} </span>
        </div>
        <div className="price">
          <span style={{ fontSize:'20px' }}>${product.price}</span>
          <del style={{ color:'red' }}>${Math.ceil(product.price + product.discountPercentage / 100)}</del>
          <span style={{ color:'green' }}> {product.discountPercentage}%</span>
          <span style={{ color:'green' }}>Off</span>
        </div>
        <div className="color">
          <div className="title"><span>Color: </span></div>
          <div className="value">
            <input onChange={handleChangeColor} checked={color === 'white'} id="white" type="radio" name="white" value="white" />
            <label style={{background:'white'}} htmlFor="white"></label>
            <input onChange={handleChangeColor} checked={color === 'red'}  id="red" type="radio" name="red" value="red" />
            <label style={{background:'red'}} htmlFor="red"></label>
            <input onChange={handleChangeColor} checked={color === 'blue'} id="blue" type="radio" name="blue" value="blue" />
            <label style={{background:'blue'}} htmlFor="blue"></label>
            <input onChange={handleChangeColor} checked={color === 'green'} id="green" type="radio" name="green" value="green" />
            <label style={{background:'green'}} htmlFor="green"></label>
            <input onChange={handleChangeColor} checked={color === 'pink'} id="pink" type="radio" name="pink" value="pink" />
            <label style={{background:'pink'}} htmlFor="pink"></label>
          </div>
        </div>
        <div className="size">
          <div className="title"><span>Size: </span></div>
          <div className="value">
            <input onChange={handleChangeSize} checked={size === 'S'} id="s" type="radio" value="S" />
            <label htmlFor="s">S</label>
            <input onChange={handleChangeSize} checked={size === 'M'} id="m" type="radio" value="M" />
            <label className="active" htmlFor="m">M</label>
            <input onChange={handleChangeSize} checked={size === 'L'} id="l" type="radio" value="L" />
            <label htmlFor="l">L</label>
            <input onChange={handleChangeSize} checked={size === 'XL'} id="xl" type="radio" value="XL" />
            <label htmlFor="xl">XL</label>
          </div>
        </div>
        <div className=" btn-section">
          <div className="quanity">
            <button onClick={()=>setCount(count >= 2 ? count - 1 : 1)}>-</button>
            <div className="count">{count}</div>
            <button onClick={()=>setCount(count <= 9 ? count + 1 : 1)} className="active">+</button>
          </div>
          <span><i className="fa-regular fa-heart"></i></span>
        </div>
        <div className="buy-now-btn" id="buy-now-btn">
          <Link to="/product/cart" onClick={AddtoCart}  className="green">Add To Cart</Link>
          <Link to="" onClick={BuyNow}>Buy Now</Link>
        </div>
        <div className="delivery">
          <div className="free-delivery litle-flex">
            <i className="fa-solid fa-truck"></i>
            <div className="content">
              <h3>Free Delivery</h3>
              <p>Enter your postal code htmlFor Delivery Availability</p>
            </div>
          </div>
          <div className="return-delivery litle-flex">
            <i className="fa-solid fa-arrows-rotate"></i>
            <div className="content">
              <h3>Return Delivery</h3>
              <p>Free Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 
   }
   <section className="product-details">
    <h1 className='heading'>Product datails</h1>
    <div className="container">
      <div className="tab">
        <span style={{ background:activeTab === 'description' && '#dddddd' }} onClick={()=>handleTab('description')} className='tab-name'>Description</span>
        <span style={{ background:activeTab === 'ratting' && '#dddddd' }} onClick={()=>handleTab('ratting')} className='tab-name'>Ratting</span>
        <span style={{ background:activeTab === 'review' && '#dddddd' }} onClick={()=>handleTab('review')} className='tab-name'>Review</span>
      </div>
      <div className="tab-content">
      {activeTab === 'description' && <Description/>}
      {activeTab === 'ratting' && <Ratting/>}
      {activeTab === 'review' && <Review/>}
      </div>
    </div>
   </section>
   <ReletiveProduct API_URL={API} pagination={false}/>
   </>
  )
}

export default SingleProduct
