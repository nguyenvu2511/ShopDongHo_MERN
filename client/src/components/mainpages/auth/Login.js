import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    console.log(e.target);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('user/login', { ...user });

      alert('Đăng nhập thành công !');

      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="container login">
        <h3 className="title">ĐĂNG NHẬP</h3>
        <div className="login-page">
          <form onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              placeholder="Email"
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="form-control"
              value={user.password}
              onChange={onChangeInput}
            />
            <div className="row">
              <button className="btn btn-success" type="submit">
                Đăng nhập
              </button>
              <Link to="/register">Đăng ký</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
