import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import ProductItem from '../../products/productItem/ProductItem';

function DetailBrand() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [brands] = state.brandsAPI.brands;
  const addCart = state.userAPI.addCart;
  const [brand, setBrand] = useState('');

  useEffect(() => {
    if (params.id) {
      brands.forEach((brand) => {
        if (brand._id === params.id) setBrand(brand);
      });
    }
  }, [params.id, brands]);

  return (
    <>
      <div className="container">
        <h2>Đồng hồ {brand.name}</h2>
        <div className="products">
          {products.map((product) => {
            return product.brand === brand.name ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailBrand;
