import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../../public/data";

export const  CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const loadProducts = async () => {
            try{
                setProducts(PRODUCTS);
                console.log('Products loaded:',  PRODUCTS);
            } catch (error) {
                console.error('Fetch products error:', error);
            }
            
        };

        loadProducts();
    }, []);
    
    const addToCart = (product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
      
          if (existingProduct) {
            // Update the quantity of the existing product
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            // Add the new product with an initial quantity of 1
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
    };
      
    
    const removeFromCart = (productId) => {
        setCart((prevCart) =>
          prevCart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0) // Remove items with quantity 0
        );
    };

    const calculateTotal = () => {
        return  Math.round((cart.reduce((total, item) => total + item.price * item.quantity, 0)) * 100) / 100
    };
    
    return (
        <CartContext.Provider value={{ products, cart, addToCart, removeFromCart, calculateTotal }}>
        {children}
        </CartContext.Provider>
    );
}