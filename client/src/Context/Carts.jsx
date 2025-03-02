import React, { createContext, useContext, useState,useEffect } from 'react'

export const CartsContext = createContext();

function CartsProvider({children}) {
    const [carts,setCarts] = useState([]);
    
    useEffect(()=>{
      const storecart = JSON.parse(localStorage.getItem('carts'));
      if(storecart) setCarts(storecart);
    },[]);

  return (
    <CartsContext.Provider value={{ carts,setCarts }}>
      {children}
    </CartsContext.Provider>
  )
}

export default CartsProvider

export const useCarts = () => { return useContext(CartsContext) };


