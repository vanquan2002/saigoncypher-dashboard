import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "./../../redux/actions/OrderActions";
import { listProduct } from "./../../redux/actions/ProductActions";
import { formatCurrency } from "../../utils/formatCurrency";
import Error from "../loadingError/Error";
import Loading from "../loadingError/Loading";

const TopTotal = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading: loadingOrders, error: errorOrders } = orderList;
  const productList = useSelector((state) => state.productList);
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = productList;

  let totalSale =
    orders?.reduce((sum, item) => {
      return item.orderStatus.isReceived ? sum + item.totalPrice : sum;
    }, 0) ?? 0;

  useEffect(() => {
    dispatch(listProduct());
    dispatch(listOrder());
  }, [dispatch]);

  return (
    <div className="">
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <li className="col-span-1">
          <div className="border border-neutral-300 px-4 py-2 flex flex-col items-center justify-center h-[4.5rem]">
            <span className="text-sm">Tổng doanh thu</span>
            {loadingOrders ? (
              <div className="mt-0.5">
                <Loading />
              </div>
            ) : errorOrders ? (
              <div className="mt-0.5">
                <Error error={errorOrders} />
              </div>
            ) : (
              <p className="mt-0.5 text-xl font-bold">
                {formatCurrency(totalSale)}
              </p>
            )}
          </div>
        </li>
        <li className="col-span-1">
          <div className="border border-neutral-300 px-4 py-2 flex flex-col items-center justify-center h-[4.5rem]">
            <span className="text-sm">Tổng đơn hàng</span>
            {loadingOrders ? (
              <div className="mt-0.5">
                <Loading />
              </div>
            ) : errorOrders ? (
              <div className="mt-0.5">
                <Error error={errorOrders} />
              </div>
            ) : (
              <p className="mt-0.5 text-xl font-bold">{orders?.length ?? 0}</p>
            )}
          </div>
        </li>
        <li className="col-span-1">
          <div className="border border-neutral-300 px-4 py-2 flex flex-col items-center justify-center h-[4.5rem]">
            <span className="text-sm">Tổng sản phẩm</span>
            {loadingProducts ? (
              <div className="mt-0.5">
                <Loading />
              </div>
            ) : errorProducts ? (
              <div className="mt-0.5">
                <Error error={errorProducts} />
              </div>
            ) : (
              <p className="mt-0.5 text-xl font-bold">
                {products?.length ?? 0}
              </p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TopTotal;
