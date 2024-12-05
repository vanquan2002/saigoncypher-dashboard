import React from "react";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";
import Contents from "../components/orderComponents/Contents";

const OrderScreen = () => {
  return (
    <div>
      <Header />
      <Contents />
      <Footer />
    </div>
  );
};

export default OrderScreen;
