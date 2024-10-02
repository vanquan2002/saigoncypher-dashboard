import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/orders/OrderMain";

const OrderScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <Header />
        <OrderMain />
      </div>
    </div>
  );
};

export default OrderScreen;
