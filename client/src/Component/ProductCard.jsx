import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Paginationation from './Paginationation';
import Skel from './Skel/Skel';

const PerPageProduct = 10;

function ProductCard({API,pagination,caching,setCaching,query}) {
    const [productData, setProductData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [currenpage, setCurrenpage] = useState(0);

    const start = PerPageProduct * currenpage ;
    const end = start + PerPageProduct ;
  
    const getProduct = async () => {
      try {
        if(caching[query]){
          setIsloading(false);
          setProductData(caching[query])
          return ;
        }
        setIsloading(true);
        const response = await fetch(API);
        const data = await response.json();
        if (response.ok) {
          setCaching(prev => ({...prev , [query] : data.products }))
          setIsloading(false);
          setProductData(data.products);
        }
      }
      catch (error) {
        setIsloading(false);
      }
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        getProduct();
      }, 200);
      return ()=> {clearTimeout(timer)}
         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API]);
  return (
        <>
        <div className="product">
            {
              isloading ? <>{[...Array(10).keys()].map((seke,i) => <div key={i} className='product__container'><Skel/></div>)}</> : productData.slice(start,end).map((product) => 
                <Link key={product.id} style={{ textDecoration:'none',color:'#222' }} to={`/product/${product.id}`}  className="product__container">
                    <div className="product__image">
                        <img src={product.thumbnail} alt="" />
                    </div>
                    <div className="product__details">
                      <div className="brand"><p className={product.availabilityStatus === 'Low Stock' ? 'active' : ''}>{product.availabilityStatus}</p><p>{product.brand}</p></div>
                        <div className='product__name'>
                            <span className='name'>{product.category}</span>
                            <span className="rating">
                            <div className="stars-outer">
                                <div className="stars-inner" style={{ width: `${(product.rating/5)*100}%` }}></div>
                            </div>
                            ({product.stock})
                            </span>
                        </div>
                        <div className="product__price">
                          <span className='o-price'>${product.price}</span>
                          <del style={{ color:'red' }}> ${Math.ceil(product.price + product.discountPercentage / 100)} </del>
                          <span style={{ color:'green' }}> {product.discountPercentage}% </span>
                          <span style={{ color:'green' }}> Off</span>
                        </div>
                        <div className="product__title">{product.title}</div>
                    </div>
                </Link>
            )
            }
        </div>
        {pagination && 
        <Paginationation 
        PerPageProduct={PerPageProduct} 
        TotalPage={Math.ceil(productData.length / PerPageProduct)}
        setCurrenpage={setCurrenpage}
        currenpage={currenpage}
        />
        }
        </>
  )
}

export default React.memo(ProductCard)
