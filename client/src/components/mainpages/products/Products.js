import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import ProductItem from './productItem/ProductItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        '/api/destroy',
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="create-product">
          {isAdmin ? (
            <Link to={`/products/create`}>
              <p>Thêm sản phẩm mới</p>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        <div className="title-product">Danh sách sản phẩm</div>
        <div className="products">
          {products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
              />
            );
          })}
        </div>
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
