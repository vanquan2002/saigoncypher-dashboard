import React from "react";
import Sidebar from "../components/Sidebar";
import OrderMain from "../components/orders/OrderMain";

const OrderScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <OrderMain />
      </div>
    </div>
  );
};

export default OrderScreen;
