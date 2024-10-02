import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import ProductsStatistics from "./ProductsStatistics";
import SaleStatistics from "./SaleStatistics";
import LatestOrder from "./LatestOrder";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";
import { listOrder } from "./../../redux/actions/OrderActions";

const Main = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProduct());
    dispatch(listOrder());
  }, [dispatch]);

  return (
    <div>
      <p>Dashboard</p>
      <TopTotal orders={orders} products={products} />
      <div className="flex">
        <SaleStatistics />
        <ProductsStatistics />
      </div>
      <LatestOrder orders={orders} loading={loading} error={error} />
    </div>
  );
};

export default Main;
