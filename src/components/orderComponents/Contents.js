import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../redux/actions/OrderActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";

const Contents = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);

  return (
    <div className="px-3 mt-5 mb-28">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="text-center text-sm p-2 border border-gray-300">
                STT
              </td>
              <td className="text-center text-sm p-2 border border-gray-300">
                Sản phẩm
              </td>
              <td className="text-center text-sm p-2 border border-gray-300">
                Ảnh
              </td>
              <td className="text-center text-sm p-2 border border-gray-300">
                Trạng thái
              </td>
              <td className="text-center text-sm p-2 border border-gray-300">
                Thời gian
              </td>
              <td className="text-center text-sm p-2 border border-gray-300">
                Tổng
              </td>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr key={i} className="border border-gray-300">
                <td className="text-center border-r border-gray-300">
                  {i + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contents;
