import React from "react";

const OrderDetailInfo = ({ order }) => {
  return (
    <div className="flex gap-52 border-2 border-indigo-600 m-2 p-2">
      <div>
        <p>Customer</p>
        <p>{order.user.name}</p>
        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
      </div>
      <div>
        <p>Order info</p>
        <p>Shipping: {order.shippingAddress.country}</p>
        <p>Pay method: {order.paymentMethod}</p>
      </div>
      <div>
        <p>Deliver to</p>
        <p>
          Address: {order.shippingAddress.address}, {order.shippingAddress.city}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
