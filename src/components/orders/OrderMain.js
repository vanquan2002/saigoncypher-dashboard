import React, { useEffect } from "react";
import Orders from "./Orders";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { listOrder } from "./../../redux/actions/OrderActions";

const OrderMain = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);

  return (
    <div>
      <p>Orders</p>
      <div className="flex border-2 border-indigo-600 m-2 p-2 gap-24">
        <p>Search...</p>
        <div className="flex gap-5">
          <select>
            <option value="" key="">
              Status
            </option>
          </select>
          <select>
            <option value="" key="">
              Show 20
            </option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <Orders orders={orders} />
      )}
    </div>
  );
};

export default OrderMain;
