import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import './OrderHistory.css';
var CurrencyFormat = require('react-currency-format');

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <h2>CHI TIẾT ĐƠN HÀNG : {orderDetails._id}</h2>

      <table style={{ margin: '30px 0px' }}>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>
                <img src={item.images.url} alt="" />
              </td>

              <td>{item.quantity}</td>
              <td>
                <CurrencyFormat
                  value={item.price * item.quantity}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' VND'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
