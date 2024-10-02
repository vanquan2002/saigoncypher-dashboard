import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/actions/OrderActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import moment from "moment";
import { deliverOrder } from "./../../redux/actions/OrderActions";

const OrderDetailMain = ({ orderId }) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
  const deliverHandle = () => {
    dispatch(deliverOrder(order));
  };

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  return (
    <div>
      <button className="border-2 border-indigo-600 m-2 p-2">
        BACK TO ORDERS
      </button>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="border-2 border-indigo-600 m-2 p-2">
          <div className="flex justify-between border-2 border-indigo-600 m-2 p-2">
            <div>
              <p>{moment(order.createdAt).format("lll")}</p>
              <p>Order ID: {order._id}</p>
            </div>
            <div>
              <select>
                <option value="" key="">
                  Change status
                </option>
              </select>
              <button className="border-2 border-indigo-600 m-2 p-2">
                Save
              </button>
            </div>
          </div>
          <OrderDetailInfo order={order} />
          <div className="flex">
            <OrderDetailProducts order={order} loading={loading} />
            {order.isDelivered ? (
              <p className="border-2 h-10 border-indigo-600 m-2 p-2">
                DELIVERED AT {moment(order.deliveredAt).format("lll")}
              </p>
            ) : (
              <>
                {loadingDelivered && <Loading />}
                <button
                  onClick={deliverHandle}
                  className="border-2 h-10 border-indigo-600 m-2 p-2"
                >
                  MARK AS DELIVERED
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailMain;
