import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './Brands.css';
import { Link } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

function Brands() {
  const state = useContext(GlobalState);
  const [brands] = state.brandsAPI.brands;
  const [brand, setBrand] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.brandsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const [isAdmin] = state.userAPI.isAdmin;
  const [images, setImages] = useState(false);
  const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/brand/${id}`,
          { name: brand, images },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          '/api/brand',
          { name: brand, images },
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

  const editBrand = async (id, name, images) => {
    setID(id);
    setBrand(name);
    setImages(images);
    console.log(images, 'edited');
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
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="brands">
      {isAdmin ? (
        <>
          <label htmlFor="title">Hình ảnh</label>
          <div>
            <input type="file" name="file" onChange={handleUpload} />
          </div>
          <form onSubmit={createBrand}>
            <label htmlFor="brand">Tên thương hiệu</label>
            <input
              type="text"
              name="brand"
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            />

            <button className="btn btn-success" type="submit">
              {onEdit ? 'Cập nhật' : 'Thêm'}
            </button>
          </form>
        </>
      ) : (
        <h3 className="title"> DANH SÁCH THƯƠNG HIỆU</h3>
      )}

      <div className="container">
        {brands.map((brand) => (
          <div className="row" key={brand._id}>
            <img src={brand.images.url} width="180px" height="108px" />
            <Link
              to={`/brands/${brand._id}`}
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              <p>{brand.name}</p>
            </Link>
            {isAdmin ? (
              <div>
                <button
                  className="btn btn-primary btnedit"
                  onClick={() => editBrand(brand._id, brand.name, brand.images)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteBrand(brand._id)}
                >
                  Xóa
                </button>
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

export default Brands;
