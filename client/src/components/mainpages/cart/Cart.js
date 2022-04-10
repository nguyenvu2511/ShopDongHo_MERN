import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import './Cart.css';
import Trash from './icon/trash.svg';
import axios from 'axios';
var CurrencyFormat = require('react-currency-format');

function Cart() {
  const state = useContext(GlobalState);
  console.log(state);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng ?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async () => {
    await axios.post(
      '/api/order',
      { cart, total },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart([]);
    setCallback(!callback);
    alert('Order success !');
  };

  if (cart.length === 0)
    return (
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        Giỏ hàng trống
      </h1>
    );
  return (
    <div>
      <div className="px-4 px-lg-0 cart-shop">
        <div className="container text-white py-5 text-center">
          <h1 style={{ color: 'black' }}>GIỎ HÀNG</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Sản phẩm</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Số lượng</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Thành tiền</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Hành động</div>
                      </th>
                    </tr>
                  </thead>
                  {cart.map((product) => (
                    <tbody key={product._id}>
                      <tr>
                        <th scope="row">
                          <div className="p-2">
                            <img
                              src={product.images.url}
                              alt=""
                              width="70"
                              className="img-fluid rounded shadow-sm"
                            />
                            <div className="ml-3 d-inline-block align-middle">
                              <h5 className="mb-0">
                                <a
                                  href="#"
                                  className="text-dark d-inline-block name-sp"
                                >
                                  {product.name}
                                </a>
                              </h5>
                              <span className="text-muted font-weight-normal font-italic">
                                Loại sản phẩm: {product.category}
                              </span>
                            </div>
                          </div>
                        </th>
                        <td className="align-middle">
                          <div className="amount">
                            <button onClick={() => decrement(product._id)}>
                              -
                            </button>
                            <strong>{product.quantity}</strong>
                            <button onClick={() => increment(product._id)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>
                            <CurrencyFormat
                              value={product.price * product.quantity}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' VND'}
                            />
                          </strong>
                        </td>

                        <td className="align-middle">
                          <a href="#" className="text-dark">
                            <img
                              src={Trash}
                              onClick={() => removeProduct(product._id)}
                              alt=""
                              width="15"
                            />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>

          <div className="row py-5 p-4 bg-white rounded shadow-sm content-down">
            <div className="col-lg-6">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                Ghi chú cho người bán
              </div>
              <div className="p-4">
                <p className="font-italic mb-4">
                  Nếu bạn có một số thông tin cho người bán, bạn có thể để lại
                  chúng trong khung bên dưới
                </p>
                <textarea
                  name=""
                  cols="30"
                  rows="2"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                Order summary{' '}
              </div>
              <div className="p-4">
                <p className="font-italic mb-4">
                  Chi phí vận chuyển và bổ sung được tính dựa trên các giá trị
                  bạn đã nhập.
                </p>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">
                      Shipping and handling
                    </strong>
                    <strong>0</strong>
                  </li>

                  <li className="d-flex justify-content-between py-3 border-bottom">
                    <strong className="text-muted">Total</strong>
                    <h5 className="font-weight-bold">
                      <CurrencyFormat
                        value={total}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' VND'}
                      />
                    </h5>
                  </li>
                </ul>
                <a
                  href="#"
                  onClick={tranSuccess}
                  className="btn btn-success rounded-pill py-2 btn-block"
                >
                  Đặt Hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
