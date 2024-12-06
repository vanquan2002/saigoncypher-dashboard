import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../redux/actions/OrderActions";
import Loading from "../loadingError/Loading";
import Error from "../loadingError/Error";
import { Link } from "react-router-dom";

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
                <td className="border-r border-gray-300 p-2">
                  <div className="flex flex-col md:flex-row gap-x-1 gap-y-2.5 w-full">
                    <div className="relative h-[60px] w-auto md:w-1/4 lg:w-1/6">
                      {item.orderItems.slice(0, 3).map((itemOrder, i) => (
                        <img
                          key={i}
                          src={itemOrder.thumbImage}
                          alt=""
                          className="h-full aspect-[2/3] absolute top-0 shadow-md shadow-neutral-300 object-cover"
                          style={{ left: `${i * 18}px` }}
                        />
                      ))}
                    </div>
                    <div className="">
                      {item.orderItems.slice(0, 3).map((itemOrder, i) => (
                        <p key={i} className="text-xs">
                          {itemOrder.name}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    {item.orderItems.length > 3 && (
                      <span className="text-xs">
                        + {item.orderItems.length - 3}
                      </span>
                    )}
                    <Link to="" className="underline text-xs">
                      Xem chi tiết
                    </Link>
                  </div>
                </td>
                <td className="border-r border-gray-300 bg-red-300"></td>
                <td className="border-r border-gray-300 bg-yellow-300"></td>
                <td className="border-r border-gray-300 bg-green-300"></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contents;
