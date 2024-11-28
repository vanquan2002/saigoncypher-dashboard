import React from "react";

const OrderDetailProducts = ({ order }) => {
  return (
    <div className="w-1/2 border-2 border-indigo-600 m-2 p-2">
      <table>
        <thead>
          <tr>
            <th className="px-6 py-3 bg-neutral-50 text-left text-xs leading-4 font-medium text-neutral-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 bg-neutral-50 text-left text-xs leading-4 font-medium text-neutral-500 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-6 py-3 bg-neutral-50 text-left text-xs leading-4 font-medium text-neutral-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 bg-neutral-50 text-left text-xs leading-4 font-medium text-neutral-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {order.orderItems.map((item, i) => (
            <tr key={i} className="hover:bg-neutral-100">
              <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">${item.price}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.qty}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                ${item.price * item.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end">
        <p>Subtotal: ${order.itemsPrice}</p>
        <p>Shipping cost: ${order.shippingPrice}</p>
        <p>Grand total: ${order.totalPrice}</p>
        <p>Status: {order.isPaid ? "Payment done" : "Not Paid"}</p>
      </div>
    </div>
  );
};

export default OrderDetailProducts;
