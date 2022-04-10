import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';
var CurrencyFormat = require('react-currency-format');
function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          if (isAdmin) {
            const res = await axios.get('/api/order', {
              headers: { Authorization: token },
            });
            setHistory(res.data);
          } else {
            const res = await axios.get('/user/history', {
              headers: { Authorization: token },
            });

            setHistory(res.data);
          }
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory, callback]);
  const saveSubmit = async (id) => {
    try {
      const res = await axios.put(
        `/api/order/${id}`,
        { status: true },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="container order-history">
      <h2>LỊCH SỬ ĐẶT HÀNG</h2>

      <h4 className="title">Hiện có {history.length} đơn hàng</h4>
      <table id="customers">
        <tr>
          <th>Mã đơn hàng</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Ngày đặt</th>
          <th>Trạng thái</th>
          {isAdmin && <th>Cập nhật trạng thái</th>}
          <th>Tổng tiền</th>
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
            {isAdmin && (
              <td>
                {item.status === false ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => saveSubmit(item._id)}
                  >
                    Xác nhận
                  </button>
                ) : (
                  ''
                )}
              </td>
            )}

            <td>
              <CurrencyFormat
                className="product_price"
                value={item.total}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' VND'}
              />
            </td>
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
