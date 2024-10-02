import React from "react";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const LatestOrder = ({ orders, loading, error }) => {
  const navigate = useNavigate();
  return (
    <>
      <p>New order</p>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="w-3/4 border-2 border-indigo-600 m-2 p-2">
          <table>
            {/* <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead> */}
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((item, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    ${item.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.isPaid
                      ? "Paid at: " + moment(item.paidAt).format("lll")
                      : "Not Paid"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {moment(item.createdAt).format("lll")}
                  </td>
                  <td
                    onClick={() => navigate(`/order/${item._id}`)}
                    className="px-6 py-4 whitespace-no-wrap"
                  >
                    detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default LatestOrder;
