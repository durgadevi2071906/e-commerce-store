import React,{useState} from 'react';
import ProductCard from './ProductCard';

function ReletiveProduct({API_URL}) {
      const [caching,setCaching] = useState({});
  
  return (
    <>
        <section className="reletive-product">
            <h2 className='heading'>Reletive Product</h2> 
            <ProductCard API={API_URL} query={''} caching={caching} setCaching={setCaching}/>
        </section>
    </>
    
  )
}

export default ReletiveProduct
