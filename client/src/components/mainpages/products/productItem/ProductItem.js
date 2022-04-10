import React from 'react';
import { Link } from 'react-router-dom';
import BtnRender from './BtnRender';
var CurrencyFormat = require('react-currency-format');
function ProductItem({ product, isAdmin, deleteProduct }) {
  return (
    <div className="container">
      <div className="product_card">
        <img src={product.images.url} />
        <div className="product_box">
          <Link to={`/detail/${product._id}`}>
            <h2> {product.name}</h2>
          </Link>
          <div className="product_price">
            <CurrencyFormat
              className="product_price"
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' VND'}
            />
          </div>
          <p>{product.description}</p>
        </div>
        {/* <div className="row_btn">
          <Link id = "btn_buy" to = "#!">Buy</Link>
          <Link id = "btn_view" to = {`detail/${product._id}`}>View</Link>
        </div> */}
        <BtnRender product={product} deleteProduct={deleteProduct} />
      </div>
    </div>
  );
}

export default ProductItem;
