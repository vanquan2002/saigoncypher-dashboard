import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Order = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Paid
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Active
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((item, i) => (
          <tr key={i} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-no-wrap">{item.user.name}</td>
            <td className="px-6 py-4 whitespace-no-wrap">{item.user.email}</td>
            <td className="px-6 py-4 whitespace-no-wrap">${item.totalPrice}</td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {item.isPaid
                ? "Paid at: " + moment(item.paidAt).format("lll")
                : "Not Paid"}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {moment(item.createdAt).format("lll")}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              {item.isDelivered ? "Delivered" : "Not Delivered"}
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
  );
};

export default Order;
