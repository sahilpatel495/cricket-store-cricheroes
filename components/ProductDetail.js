import { useAuth } from '../context/AuthContext';

const ProductDetail = ({ product }) => {
  const { addToCart, currentUser  } = useAuth(); // Use the custom hook

  const handleAddToCart = () => {
    if (currentUser ) {
      addToCart(product);
    } else {
      alert("Please log in to add items to your cart.");
    }
  };

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;