import React from "react";

const SaleStatistics = () => {
  return (
    <div className="w-full">
      <h3 className="text-sm uppercase">Biểu đồ thông kê doanh thu</h3>
      <iframe
        className="mt-2 w-full h-full border border-neutral-300 p-4"
        src="https://charts.mongodb.com/charts-verstehe-pyvyz/embed/charts?id=65ed8687-e819-45cf-82e8-6a08a1ef2a8b&maxDataAge=3600&theme=light&autoRefresh=true"
        title="Biểu đồ thông kê doanh thu"
      ></iframe>
    </div>
  );
};

export default SaleStatistics;
