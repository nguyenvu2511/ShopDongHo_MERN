import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import ProductItem from '../utils/productItem/ProductItem';
import { Link } from 'react-router-dom';
function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
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
