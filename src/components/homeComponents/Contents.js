import React from "react";
import TopTotal from "./TopTotal";
import ProductsStatistics from "./ProductsStatistics";
import SaleStatistics from "./SaleStatistics";

const Contents = () => {
  return (
    <div className="px-3 mt-5 mb-28">
      <TopTotal />
      <div className="flex flex-col md:flex-row gap-12 md:gap-3 mt-10 h-72">
        <SaleStatistics />
        <ProductsStatistics />
      </div>
    </div>
  );
};

export default Contents;
