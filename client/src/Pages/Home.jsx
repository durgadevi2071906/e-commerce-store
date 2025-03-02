import React,{useState} from 'react';
import Product from '../Component/ProductCard';
import Hero from '../Component/Hero/Hero';


function Home() {
    const [caching,setCaching] = useState({});
  
  const data = [
    {   
      id : 1,
      product_name: "Wrist watch",
      tag : "Premium quality",
      title : "The best men’s watches money can buy",
      description :"Centuries before the advent of smartphones, watches served a highly practical purpose as efficient, mechanical time-telling tools. Since then, they have evolved to be about far more than just function.",
      btn_text : "Shop now",
      image_one : "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      image_two : "https://images.unsplash.com/photo-1602752975366-5520991f958d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      image_three : "https://images.unsplash.com/photo-1589959320097-04f13ffc34a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
    },
    {
      id : 2,
      product_name: "Women ring",
      tag : "Premium quality",
      title : "The best women rings money can buy",
      description :"Centuries before the advent of smartphones, rings served a highly practical purpose as efficient, mechanical time-telling tools. Since then, they have evolved to be about far more than just function.",
      btn_text : "Shop now",
      image_one : "https://images.unsplash.com/photo-1611146942956-d6be598e13cd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image_two : "https://images.unsplash.com/photo-1614606140245-2c33ece9e2cf?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image_three : "https://images.unsplash.com/photo-1612239396116-4da3087f8f79?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id : 3,
      product_name: "Wrist Perfume",
      tag : "Premium quality",
      title : "The best men’s perfumes money can buy",
      description :"Centuries before the advent of smartphones, perfumes served a highly practical purpose as efficient, mechanical time-telling tools. Since then, they have evolved to be about far more than just function.",
      btn_text : "Shop now",
      image_one : "https://images.unsplash.com/photo-1627408727578-172381083156?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image_two : "https://images.unsplash.com/photo-1609255836143-3480a093a35b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image_three : "https://plus.unsplash.com/premium_photo-1661964363769-4a96114591a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id : 4,
      product_name: "Wrist Bag",
      tag : "Premium quality",
      title : "The best men’s bags money can buy",
      description :"Centuries before the advent of smartphones, bags served a highly practical purpose as efficient, mechanical time-telling tools. Since then, they have evolved to be about far more than just function.",
      btn_text : "Shop now",
      image_one : "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image_two : "https://media.istockphoto.com/id/860424574/photo/fashion-girl-with-handbag-posing-at-the-background-weariing-a-coat.jpg?s=2048x2048&w=is&k=20&c=pgNIAPcTOD7eAjc9t_QoIrLCEizJ-gg3_Con9oYKvlU=",
      image_three : "https://images.unsplash.com/photo-1531938716357-224c16b5ace3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },       
  ]
  const API = `https://dummyjson.com/products?limit=200`;

  return (
    <>
      <div className='home'>
        <Hero data={data}/>
      </div>
      <section className='product-home'>
        <Product API={API} pagination={true} query={''} caching={caching} setCaching={setCaching} />   
      </section>
    </>
  )
}

export default Home
