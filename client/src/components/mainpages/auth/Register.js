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
      localStorage.setItem('fisrtLogin', true);

      alert('Đăng ký thành công !');

      window.location.href = '/login';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
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
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />
          <input
            type="text"
            name="address"
            required
            placeholder="Address"
            value={user.address}
            onChange={onChangeInput}
          />
          <div className="row">
            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
