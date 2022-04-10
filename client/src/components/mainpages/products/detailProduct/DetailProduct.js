import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import ProductItem from '../productItem/ProductItem';
var CurrencyFormat = require('react-currency-format');
function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className="container">
        <div className="detail">
          <img src={detailProduct.images.url} alt="" />
          <div className="box-detail">
            <div className="row">
              <h2>{detailProduct.name}</h2>

              <span className="price">Đã bán: {detailProduct.sold}</span>
            </div>
            <span>
              <CurrencyFormat
                className="product_price"
                value={detailProduct.price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' VND'}
              />
            </span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>

            <Link to="/cart" onClick={() => addCart(detailProduct)}>
              <button className="btn btn-primary">Mua Ngay</button>
            </Link>
          </div>
        </div>

        <div>
          <h2>Sản phẩm cùng loại</h2>
          <div className="products">
            {products.map((product) => {
              return product.category === detailProduct.category ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
