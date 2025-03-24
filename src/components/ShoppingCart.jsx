import { useContext } from "react";
import { CartContext } from "./CartContext";

import "./ShoppingCart.css";

const ShoppingCart = () => { 

    const {cart, removeFromCart, calculateTotal} = useContext(CartContext);
    const handleRemoveFromCart = (id) => {
        console.log('Product removed from cart:', id);
        removeFromCart(id);
    };
    return (
        <div className="shopping-cart">
        <h1>Shopping Cart</h1>
            {  cart.length === 0 ? (
                <div className="cart-empty"> 

                    <p> Your Cart is empty</p>
                </div>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <h3>{item.name}</h3>
                            <p> Quantity: {item.quantity}</p>
                            <p>${item.price}</p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div className="cart-total">Total: ${calculateTotal()}</div>
                </div>
            )
            }
        </div>
    );
}
export default ShoppingCart;
