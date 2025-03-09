import React, { useEffect, useState } from 'react'
import ProductCard from '../../Component/ProductCard'
import './shop.css'

function Shop() {
  const [query,setQuery] = useState('');
  const [API,setAPI] = useState('');
  const [productName,setProductName] = useState([]);
  const [caching,setCaching] = useState({});
 
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(query.length > 0){
      console.log('submit form')
    }
  }

  const handleChange = (e)=>{
    setQuery(e.target.value.toLowerCase());
    if(query.length > 0){
      const API = `https://dummyjson.com/products/search?q=${query}`
      setAPI(API)
    }
  }

  const handleName = (name)=>{
    setQuery(name)
    if(query.length > 0){
      const API = `https://dummyjson.com/products/search?q=${query}`
      setAPI(API)
    }
  }

  const getProductName = async()=>{
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=200`);
      const data = await response.json();
      setProductName(data.products);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
      getProductName()
    }, 300);
    return ()=>{clearTimeout(timer)}
  },[])
  useEffect(()=>{
    if(query.length === 0){
      setAPI('https://dummyjson.com/products?limit=200')
    }
  },[query])
  return (
    <>
    <section className='shop'>
      <form onSubmit={handleSubmit}>
        <div className='search-heading'>Search by <b>{query}</b></div>
        <input  className='search' value={query} onChange={handleChange} type="text" placeholder='Seaching...' />  
        <input type="submit" hidden />
        <div className='search-box'>
          {query && productName.filter(item => item.title.indexOf(query) !== -1).map((cate,i) => (
            <div key={i} className='category' onClick={()=>handleName(cate.title)}>
              <p>{cate.title}</p>
            </div>
          ))}
        </div>
      </form>
      <ProductCard API={API} pagination={false} caching={caching} setCaching={setCaching} query={query}/>
    </section>
    </>
  )
}

export default Shop
