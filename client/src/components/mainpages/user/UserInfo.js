import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';

function UserInfo() {
  const state = useContext(GlobalState);
  const [userInfo, setUserInfo] = state.userAPI.userInfo;
  const [token] = state.token;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    console.log(e.target);
  };

  const saveSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/user/update/${userInfo._id}`,
        { userInfo },
        {
          headers: { Authorization: token },
        }
      );
      alert('Update success');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-4 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span class="font-weight-bold">{userInfo.name}</span>
            <span class="text-black-50">{userInfo.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-8 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Thông tin người dùng</h4>
            </div>
            <form onSubmit={saveSubmit}>
              <div class="row mt-2">
                <div class="col-md-12">
                  <label class="labels">Họ tên</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Họ tên"
                    value={userInfo.name}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control disabled"
                    placeholder="Email"
                    name="email"
                    disabled
                    value={userInfo.email}
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    name="phonenumber"
                    placeholder="Số điện thoại"
                    value={userInfo.phonenumber}
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Địa chỉ</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Địa chỉ"
                    name="address"
                    value={userInfo.address}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button" type="submit">
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
