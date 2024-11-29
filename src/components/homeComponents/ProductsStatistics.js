import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="w-full">
      <h3 className="text-sm uppercase">Biểu đồ thông kê sản phẩm</h3>
      <iframe
        className="mt-2 w-full h-full border border-neutral-300 p-4"
        src="https://charts.mongodb.com/charts-verstehe-pyvyz/embed/charts?id=65ed8aa8-38af-4949-8837-fbb997bb93a2&maxDataAge=3600&theme=light&autoRefresh=true"
        title="Biểu đồ thông kê sản phẩm"
      ></iframe>
    </div>
  );
};

export default ProductsStatistics;
