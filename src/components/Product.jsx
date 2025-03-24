import { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Product.css";

const Product = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        console.log('Product added to cart:', product);
        addToCart(product);
    };

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => handleAddToCart()}>Add to Cart</button>
    </div>
  );
}

export default Product;