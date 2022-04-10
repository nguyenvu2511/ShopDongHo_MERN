import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';
import './CreateProduct.css';
const initialState = {
  product_id: '',
  name: '',
  price: 0,
  description: '',
  content: '',
  category: '',
  _id: '',
  brand: '',
};
function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [brands] = state.brandsAPI.brands;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const styleUpload = {
    display: images ? 'block' : 'none',
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải Admin');
      const file = e.target.files[0];

      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024) return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert('Bạn không phải Admin');
      setLoading(true);
      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải Admin');
      if (!images) return alert('Không có hình ảnh');

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
      } else {
        await axios.post(
          '/api/products',
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
      }
      alert('Cập nhật thông tin sản phẩm thành công !');
      history.push('/products');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  console.log(product);
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ''} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_id">Product ID</label>
          <input
            className="form-control"
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            disabled={onEdit}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            required
            value={product.name}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            onChange={handleChangeInput}
            rows="7"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categories">Loại sản phẩm: </label>
          <select
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Chọn loại sản phẩm</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="categories">Thương hiệu: </label>
          <select
            name="brand"
            className="form-control"
            value={product.brand}
            onChange={handleChangeInput}
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={!onEdit ? 'btn btn-primary' : 'btn btn-warning'}
        >
          {onEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
