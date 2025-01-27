import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart } = useContext(AuthContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      </div>
  );
}
   