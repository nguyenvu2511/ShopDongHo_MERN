import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import Menu from './icon/menu.svg';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';
import Logo from './icon/logo.png';
import login from './icon/login.svg';
import axios from 'axios';
import logo from './icon/logogc.png';
import logoadmin from './icon/logoadmin.jpg';
import './Header1.css';

function Header1() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [categories] = state.categoriesAPI.categories;
  console.log(state);
  const logoutUser = async () => {
    await await axios.get('/user/logout');
    localStorage.clear();
    alert('Đăng xuất thành công!');
    window.location.href = '/';
  };
  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <div className="support">
          <Link style={{ color: 'red' }} to="/" onClick={logoutUser}>
            Đăng xuất
          </Link>
        </div>
      </>
    );
  };
  return (
    <div className="home-header-container">
      <div className="home-header-content">
        <div className="left-content">
          <img src={Menu} alt="" width="30" />
          {isAdmin ? (
            <Link to={`/`}>
              <img
                style={{ margin: '20px' }}
                src={logoadmin}
                width="130px"
                height="50px"
              />
            </Link>
          ) : (
            <Link to={`/`}>
              <img style={{ margin: '20px' }} src={Logo} width="130px" />
            </Link>
          )}
        </div>
        <div className="center-content">
          {isAdmin ? (
            <div className="child-content">
              <Link to={`/products`}>
                <b>Sảm phẩm</b>
              </Link>
              <div className="subs-title">Quản lý sản phẩm</div>
            </div>
          ) : (
            <div className="child-content">
              <Link to={`/products`}>
                <b>Sảm phẩm</b>
              </Link>
              <div className="subs-title">Chọn đồng hồ theo loại</div>
            </div>
          )}
          {isAdmin ? (
            <div className="child-content">
              <Link to={`/brands`}>
                <b>Thương hiệu</b>
              </Link>
              <div className="subs-title">Quản lý thương hiệu</div>
            </div>
          ) : (
            <div className="child-content">
              <Link to={`/brands`}>
                <b>Thương hiệu</b>
              </Link>
              <div className="subs-title">Chọn đồng hồ theo thương hiệu</div>
            </div>
          )}
          {isAdmin ? (
            <div className="child-content">
              <Link to={`/news`}>
                <b>Tin tức</b>
              </Link>
              <div className="subs-title">Quản lý tin tức</div>
            </div>
          ) : (
            <div className="child-content">
              <Link to={`/news`}>
                <b>Tin tức</b>
              </Link>
              <div className="subs-title">Tin tức mới về đồng hồ</div>
            </div>
          )}
          {isAdmin ? (
            <div className="child-content">
              <Link to={`/categories`}>
                <div>
                  <b>Loại sản phẩm</b>
                </div>
              </Link>
              <div className="subs-title">Quản lý loại sản phẩm</div>
            </div>
          ) : (
            <div className="child-content">
              <Link to={`/categories`}>
                <div>
                  <b>Loại sản phẩm</b>
                </div>
              </Link>
              <div className="subs-title">Chọn đồng hồ theo loại sản phẩm</div>
            </div>
          )}

          {isAdmin ? (
            <div className="child-content">
              <Link to={`/order-history`}>
                <div>
                  <b>Đơn Hàng</b>
                </div>
              </Link>
              <div className="subs-title">Quản lý đơn hàng</div>
            </div>
          ) : (
            <div className="child-content">
              <Link to={`/order-history`}>
                <div>
                  <b>Lịch sử</b>
                </div>
              </Link>
              <div className="subs-title">Lịch sử đặt hàng</div>
            </div>
          )}
        </div>
        <div className="right-content">
          {isAdmin ? (
            <div></div>
          ) : (
            <>
              <Link to={`/cart`}>
                <div className="cart-icon">
                  <span>{cart.length}</span>
                  <Link to="/cart">
                    <img src={Cart} alt="" width="30" />
                  </Link>
                </div>
              </Link>
              <Link to={`/support`}>
                <div className="support">
                  <i className="fas fa-question-circle"></i>
                  <span>Hỗ trợ</span>
                </div>
              </Link>
            </>
          )}
          <div className="support">
            {isLogged ? (
              loggedRouter()
            ) : (
              <Link style={{ color: 'blue' }} to="/login">
                Đăng Nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header1;