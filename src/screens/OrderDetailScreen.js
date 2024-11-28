import React from "react";
import Sidebar from "./../components/Sidebar";
import OrderDetailMain from "./../components/orders/OrderDetailMain";
import { useParams } from "react-router-dom";

const OrderDetailScreen = () => {
  const { id } = useParams();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-5/6">
        <OrderDetailMain orderId={id} />
      </div>
    </div>
  );
};

export default OrderDetailScreen;
