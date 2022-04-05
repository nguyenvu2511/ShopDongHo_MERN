import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';
function OrderHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  return (
    <div className="container">
      <h2>LỊCH SỬ ĐẶT HÀNG</h2>

      <h4>Bạn có {history.length} đơn hàng</h4>
      <table id="customers">
        <tr>
          <th>Mã đơn hàng</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Ngày đặt</th>
          <th>Trạng thái</th>
          <th>Chi tiết đơn hàng</th>
        </tr>
        {history.map((item) => (
          <tbody key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td>{item.status === false ? 'Chưa giao' : 'Đã giao hàng'}</td>
            <td>
              <Link to={`/order-history/${item._id}`}>Xem</Link>
            </td>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default OrderHistory;
