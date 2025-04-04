import React, { useState } from 'react';
import { useGetOrdersQuery } from '../state/orderApi';
import { useSelector } from 'react-redux';

export default function OrderList() {
  const [selectedSize, setSelectedSize] = useState('All');
  const { data: orders = [] } = useGetOrdersQuery();

  // Filter orders based on selected size
  const filteredOrders = selectedSize === 'All' 
    ? orders 
    : orders.filter(order => order.size === selectedSize);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((ord) => {
            const toppings = ord.toppings || []; // Use empty array if no toppings
            return (
              <li key={ord.id}>
                <div>
                  {`${ord.customer} ordered a size ${ord.size} with ${toppings.length > 0 ? toppings.length : "no toppings."} topping${toppings.length === 1 ? '' : 's'}`}
                </div>
              </li>
            );
          })
        ) : (
          <div>No orders found</div> // Show message when no orders match the filter
        )}
      </ol>
      <div id="sizeFilters">
        <p>Filter by size:</p>
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter${size === selectedSize ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => setSelectedSize(size)}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
