import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import Menu from './icon/menu.svg';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';
import Logo from './icon/logo.png';
import axios from 'axios';
function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
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
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin' : 'VQD Shop'}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
          {isAdmin && adminRouter()}
        </li>
        <li>{isLogged ? loggedRouter() : <Link to="/login">Login</Link>}</li>
        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ''
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
