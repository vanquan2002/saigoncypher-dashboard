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
