import React from 'react';
import { useAuth } from './AuthContext';

const OrdersUI = () => {
  const { orders, currentUser } = useAuth();

  if (!currentUser) {
    return <p>Please log in to view your orders.</p>;
  }

  const userOrders = orders.filter((order) => order.userId === currentUser.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow-soft">
              <p className="text-lg font-semibold">Order Date: {new Date(order.date).toLocaleString()}</p>
              <p className="text-sm">Address: {order.address}</p>
              <p className="text-sm">Amount: ₹{order.amount.toFixed(2)}</p>
              <div className="mt-2">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <p>{item.name} - {item.quantity} pcs</p>
                      <p>Category: {item.category}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersUI;
