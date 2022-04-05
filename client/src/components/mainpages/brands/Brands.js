import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './Brands.css';
import { Link } from 'react-router-dom';
function Categories() {
  const state = useContext(GlobalState);
  const [brands] = state.brandsAPI.brands;
  const [brand, setBrand] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.brandsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const [isAdmin] = state.userAPI.isAdmin;

  const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/brand/${id}`,
          { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          '/api/brand',
          { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setBrand('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editBrand = async (id, name) => {
    setID(id);
    setBrand(name);
    setOnEdit(true);
  };

  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(`/api/brand/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="brands">
      {isAdmin ? (
        <form onSubmit={createBrand}>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={brand}
            required
            onChange={(e) => setBrand(e.target.value)}
          />

          <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
        </form>
      ) : (
        <h3>THƯƠNG HIỆU</h3>
      )}

      <div className="container">
        {brands.map((brand) => (
          <div className="row" key={brand._id}>
            <img src={brand.images.url} />
            <Link
              to={`/brands/${brand._id}`}
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              <p>{brand.name}</p>
            </Link>
            {isAdmin ? (
              <div>
                <button onClick={() => editBrand(brand._id, brand.name)}>
                  Edit
                </button>
                <button onClick={() => deleteBrand(brand._id)}>Delete</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
