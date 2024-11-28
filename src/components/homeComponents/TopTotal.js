import React from "react";

const TopTotal = ({ orders, products }) => {
  let totalSale = 0;
  if (orders) {
    orders.map((item) =>
      item.isPaid ? (totalSale = totalSale + item.totalPrice) : null
    );
  }
  return (
    <div className="flex">
      <div className="w-40 border-2 border-indigo-600 m-2 p-2">
        <p>Total sales</p>
        <p>${totalSale}</p>
      </div>
      <div className="w-40 border-2 border-indigo-600 m-2 p-2">
        <p>Total Orders</p>
        <p>{orders ? orders.length : 0}</p>
      </div>
      <div className="w-40 border-2 border-indigo-600 m-2 p-2">
        <p>Total Products</p>
        <p>{products ? products.length : 0}</p>
      </div>
    </div>
  );
};

export default TopTotal;
