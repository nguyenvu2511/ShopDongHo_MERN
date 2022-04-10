import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phonenumber: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    console.log(e.target);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('user/register', { ...user });
      alert('Đăng ký thành công !');

      window.location.href = '/login';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <h3 className="title">ĐĂNG KÝ</h3>
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Họ tên"
            value={user.name}
            onChange={onChangeInput}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Mật khẩu"
            value={user.password}
            onChange={onChangeInput}
          />
          <input
            type="text"
            name="address"
            required
            placeholder="Địa chỉ"
            value={user.address}
            onChange={onChangeInput}
          />
          <input
            type="text"
            name="phonenumber"
            required
            placeholder="Số điện thoại"
            value={user.phonenumber}
            onChange={onChangeInput}
          />
          <div className="row">
            <button type="submit">Đăng ký</button>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
