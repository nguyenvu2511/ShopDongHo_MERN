import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './products/Products';
import Login from './auth/Login';
import Cart from './cart/Cart';
import Register from './auth/Register';
import NotFound from './utils/NotFound/NotFound';
import DetailProduct from './products/detailProduct/DetailProduct';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import HomePage from './home/HomePage';
import Support from './support/Support';
import Categories from './categories/Categories';
import Brands from './brands/Brands';
import DetailBrand from './brands/detailBrand/DetailBrand';
import DetailCategory from './categories/detailCategory/DetailCategory';
import News from './news/News';
import DetailNews from './news/DetailNews';
import { GlobalState } from '../../GlobalState';
import CreateProduct from './products/createProduct/CreateProduct';
import OrderSuccess from './history/OrderSuccess';
function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/products" exact component={Products} />
      <Route
        path="/products/create"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/support" exact component={Support} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/brands" exact component={Brands} />
      <Route path="/brands/:id" exact component={DetailBrand} />
      <Route path="/categories/:id" exact component={DetailCategory} />
      <Route path="/news" exact component={News} />
      <Route path="/news/:id" exact component={DetailNews} />
      <Route
        path="/order-history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/order-history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route
        path="/order-success"
        exact
        component={isLogged ? OrderSuccess : NotFound}
      />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
