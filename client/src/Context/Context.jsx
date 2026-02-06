import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      alert("This item is already in the cart!");
    } else {
      setCartItems([...cartItems, item]);
      alert(" item added successfully")
    }
  };

  return (
    <MyContext.Provider value={{ cartItems,setCartItems,addToCart }}>
      {children}
    </MyContext.Provider>
  );
};
export const useMyContext = () => {
  return useContext(MyContext);
};
