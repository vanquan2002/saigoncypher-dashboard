import React from "react";
import TopTotal from "./TopTotal";
import ProductsStatistics from "./ProductsStatistics";
import SaleStatistics from "./SaleStatistics";

const Contents = () => {
  return (
    <div className="mb-28">
      <TopTotal />
      <div className="flex flex-col md:flex-row gap-12 md:gap-3 mt-6 px-3 h-72">
        <SaleStatistics />
        <ProductsStatistics />
      </div>
    </div>
  );
};

export default Contents;
