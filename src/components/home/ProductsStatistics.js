import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="w-1/3 border-2 border-indigo-600 m-2 p-2">
      <p>ProductsStatistics</p>
      <iframe
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100%",
          height: "300px",
        }}
        src="https://charts.mongodb.com/charts-verstehe-pyvyz/embed/charts?id=65ed8aa8-38af-4949-8837-fbb997bb93a2&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
};

export default ProductsStatistics;
