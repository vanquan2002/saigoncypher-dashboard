import React from "react";

const SaleStatistics = () => {
  return (
    <div className="w-1/3 border-2 border-indigo-600 m-2 p-2">
      <p>SaleStatistics</p>
      <iframe
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100%",
          height: "300px",
        }}
        src="https://charts.mongodb.com/charts-verstehe-pyvyz/embed/charts?id=65ed8687-e819-45cf-82e8-6a08a1ef2a8b&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
};

export default SaleStatistics;
