import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import ProductItem from '../../utils/productItem/ProductItem';

function DetailCategory() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [categories] = state.categoriesAPI.categories;
  const addCart = state.userAPI.addCart;
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (params.id) {
      categories.forEach((category) => {
        if (category._id === params.id) setCategory(category);
      });
    }
  }, [params.id, categories]);

  return (
    <>
      <div className="container">
        <h2 className="title"> {category.name}</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === category.name ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailCategory;
