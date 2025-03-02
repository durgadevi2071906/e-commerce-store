import React, { useEffect, useState } from 'react'
import  './hero.css'

const Hero = ({data}) => {
  const [index,setIndex] = useState(0);
  const NextSlide = () =>{
    setIndex(index !== 3 ? index + 1 : 0)
  }

  const slider =()=>{
    setInterval(() => {
      setIndex((prevCount) => prevCount !== 3 ? prevCount + 1 : 0);  // Increment the count
    }, 5000); 
  }

  useEffect(() => {
    slider()// 1 second interval
    return () => {
      clearInterval(slider);
    };
  }, []); 

  const handleEnter = ()=>{

  }
  const handleLeave = ()=>{

  }
  return (
    <section className='hero-section'>
      <div className="hero-overlay">
      <div className="wrapper">
        
          <div className="one" > 
            <p className="tag-line hero-text">{data[index].tag}</p>
            <h1 className="title hero-text">{data[index].title}</h1> 
            <p className="page-description hero-text">{data[index].description}</p>
            <button className="cta hero-text">{data[index].btn_text}</button>
            <img className="img-small-one" src={data[index].image_one} alt=""/>
          </div>
        
          <div className="img-large two">
            <img src={data[index].image_two} alt="" />
          </div>
          
          <div className="next-section three">
            <p className=' p-name'>{data[index].product_name}</p>
            <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={data.length === 1 ? setIndex(0) : NextSlide} className="next-watch">
              <p>NEXT</p>
              <i style={{ marginLeft:'10px',fontSize:'14px',color:'#dddddd' }} className="fa-solid fa-arrow-right"></i>
            </div>
            <img className="img-small-two" src={data[index].image_three} alt=""/>
          </div> 
          
        </div>
        </div>
    </section>
  )
}

export default Hero
