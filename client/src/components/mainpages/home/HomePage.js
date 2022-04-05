import '../../headers/Header1.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import cs from './cs.png';
import ProductItem from '../../mainpages/utils/productItem/ProductItem';
function Index() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [brands] = state.brandsAPI.brands;
  const [categories] = state.categoriesAPI.categories;
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // slickGoTo: this.handleAfterChange
  };

  return (
    <>
      <body className="home-page">
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">ĐỒNG HỒ CHÍNH HÃNG</div>
            <div className="title2">CHẤT LƯỢNG CAO</div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm kiếm" />
              {/* <i className="far fa-times-circle"></i> */}
            </div>
          </div>
          <div className="content-down"></div>
        </div>

        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Sản phẩm phổ biến</span>
              <Link to={`/products`}>
                <button className="btn-section">Xem thêm</button>
              </Link>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {products &&
                  products.length > 0 &&
                  products.map((item, index) => {
                    return (
                      <ProductItem
                        key={item._id}
                        product={item}
                        isAdmin={isAdmin}
                      />
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Thương hiệu phổ biến</span>
              <Link to={`/products`}>
                <button className="btn-section">Xem thêm</button>
              </Link>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {brands &&
                  brands.length > 0 &&
                  brands.map((brand, index) => {
                    return (
                      <>
                        <div className="container">
                          <Link to={`/brands/${brand._id}`}>
                            <img className="img-band" src={brand.images.url} />
                            <p className="band-name">{brand.name}</p>
                          </Link>
                        </div>
                      </>
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Loại sản phẩm</span>
              <Link to={`/products`}>
                <button className="btn-section">Xem thêm</button>
              </Link>
            </div>
            <div className="section-body">
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <div className=" container">
                      <Link to={`/categories/${category._id}`}>
                        <div className="category-name">
                          <p>{category.name}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Index;
